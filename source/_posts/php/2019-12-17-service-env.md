title: Laravel-リリースしたサービスの構成
date: 2019-12-17
category: PHP
---

## 基本構成

最近、仕事でLaravelを初めて使ってサービスをリリースしました。  
その構成を載せておきたいと思います。  
できるだけ費用を抑えたいのですべて、usリージョンです。

* サーバー  
  GCPのGAEスタンダードのPHP7

* DB  
  GCPのCloud SQL(MySQL5.7)

* フレームワーク  
  Laravel5.8

* エラーレポート  
  GCPのStackdriver

* セッション・キャッシュ  
  DB

ここまでは以下のドキュメントに沿ってデプロイしています。  
[Run Laravel on Google App Engine standard environment](https://cloud.google.com/community/tutorials/run-laravel-on-appengine-standard?hl=ja)

GAEにはMemcacheの機能があり、キャッシュはそれを使えば良いと思っていたのですが、PHP7の構成には対応しておらず断念。  
月額が少々するMemorystoreを使用するか、無料枠があるRedis Labsが公式に勧められていますが、一旦DB使用で保留。

## DNS

ムームーで取ったらしいドメインをCloud DNSに向けて、管理

## ストレージ

Cloud Storageを使用しています。Laravelで使用するには以下のライブラリを使用しました。  
[superbalist/laravel-google-cloud-storage](https://github.com/Superbalist/laravel-google-cloud-storage)

## ブログ機能

要件にブログ機能があったので、サブディレクトリでWordPressを動かしています。  
[GAEのサブディレクトリでWordPressを動かす](wordpress/2019-12-02-gae-wordpress/)

## Basic認証

開発サーバにアクセス来ると困るということで、ベーシック認証を以下のライブラリでかけています。  
[olssonm/l5-very-basic-auth](https://github.com/olssonm/l5-very-basic-auth)

## Sitemap.xml

サイトマップ作成は以下を使用しました。  
[laravelium/sitemap](https://gitlab.com/Laravelium/Sitemap)

## 画像加工

情報が多いので以下を使用しました。  
[intervention/image](http://image.intervention.io/)

## ユーザの画像アップロード

以下の問題が発生したので、Firebaseを使用しました。  
[GAEに画像をアップロードするのが遅い](/server/2019-12-16-gae-image-upload-slow/)

## デプロイ

現状、CI/CDの環境は整えられていないので、手動で以下のようなコードでデプロイしています。  

```
git clone --depth 1 git@github.com:xxxx/yyyyyy.git
cd yyyyyy
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
gcloud app deploy app.yaml
cd ../
rm -rf yyyyyy
```

また、デプロイ後以下のエラーが発生したので、app.yamlにはそれぞれのキャッシュファイルの保存場所を指定しています。   
[Laravel on App Engine Standard: The /srv/bootstrap/cache directory must be present and writable](https://stackoverflow.com/questions/56921310/laravel-on-app-engine-standard-the-srv-bootstrap-cache-directory-must-be-prese)

```yaml
APP_SERVICES_CACHE: /tmp/services.php
APP_PACKAGES_CACHE: /tmp/packages.php
APP_CONFIG_CACHE: /tmp/config.php
APP_ROUTES_CACHE: /tmp/routes.php
```

もう一つ以下のエラーが発生することがありました。  

`The /workspace/bootstrap/cache directory must be present and writable. `

これについてはcomposer.jsonのpost-autoload-dumpに`"mkdir -p ./bootstrap/cache/"`を追加して対処しました。  

```json
"post-autoload-dump": [
    "mkdir -p ./bootstrap/cache/",
    "Illuminate\\Foundation\\ComposerScripts::postAutoloadDump",
    "@php artisan package:discover --ansi"
],
```


## 開発用

Homesteadで開発。  
重いクエリとか見るのに以下のデバッグバーが必須。  
[barryvdh/laravel-debugbar](https://github.com/barryvdh/laravel-debugbar)

Cloud SQLのテーブルとかを操作したいのでAdminerをLaravelで使用できる以下を導入してます。  
[onecentlin/laravel-adminer](https://github.com/onecentlin/laravel-adminer)