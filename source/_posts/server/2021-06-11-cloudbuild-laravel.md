title: Cloud Buildを使ってLaravelをGAEにデプロイ
date: 2021-06-11
category: GCP
---

## Cloud Build と Github連携

Cloud Buildを初めて使いました。  
Laravelをデプロイするときの個人的なcloudbuid.yamlのメモ。


```yaml
steps:

## npm run productionをしてjs,cssファイルを生成
- name: node
  entrypoint: npm
  args: ['install']
- name: node
  entrypoint: npm
  args: ['run', 'production']
  
## APIキー情報などはシークレットマネージャに登録してあるので、そこから情報を取得して、secret.yamlとして書き出す(app.yamlからincludeする)
- name: gcr.io/cloud-builders/gcloud
  entrypoint: 'bash'
  args: [ '-c', "gcloud secrets versions access latest --secret=xxxxxx --format='get(payload.data)' | tr '_-' '/+' | base64 -d > secret.yaml" ]

## デプロイ
- name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
  entrypoint: 'bash'
  args: ['-c', 'gcloud config set app/cloud_build_timeout 1600 && gcloud app deploy app.yaml --project=xxxxxx']


## おまけでslackに通知
- name: gcr.io/cloud-builders/curl
  args:
  - -X
  - POST
  - --data-urlencode
  - "payload={\"text\":\"$BUILD_ID $REPO_NAMEをデプロイしました\"}"
  - https://hooks.slack.com/services/xxxxxxxxxxxxxxxxxxxxxxx

timeout: '1600s'


```