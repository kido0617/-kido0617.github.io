title: GAEでWordPressを運用する上でつまづいたところ
date: 2019-12-07
category: WordPress
---

## 参考資料

WordPressをGAEにデプロイする方法は英語記事ですが公式のものがあり、これを参照するのが良いと思います。  

[Run WordPress on Google App Engine standard environment](https://cloud.google.com/community/tutorials/run-wordpress-on-appengine-standard?hl=ja)


## Cloud Storageにアップロードされたファイルのフォルダ構造

WordPressからファイルをアップロードすると`1/2019/11/xxxx.jpg`のようにWordPressで設定したフォルダ構造の前に`1`というフォルダが作られます。  
この数字は何かというと、`get_current_blog_id()`で返却される値です。  
マルチブログ機能に対応するためのもので、復数ブログを運用することを想定されているようです。  


## デプロイするファイル

ローカルで開発してそのままデプロイすると`wp-content/uploads/`など不要なファイルもデプロイしてしまいます。  
基本的に[WordPress用の.gitignore](https://github.com/github/gitignore/blob/master/WordPress.gitignore)で除外されているファイルはアップロードされるべきではありません。  
GAEにデプロイするとき除外するファイルを指定する`.gcloudignore`にこれらのファイルを含めても良いですが、デプロイするときに最新のファイルをcloneしてきてそれをデプロイした方が安全な気がします。  
その上で`.gcloudignore`は以下のように私はしています。

```
.gcloudignore
.DS_Store
app.yaml
cron.yaml
dispatch.yaml
.git
.gitignore
```

デプロイ用のシェルは以下のようにしています。  
最新だけcloneしてきて、デプロイして、消すという手順です。

```
git clone --depth 1 git@github.com:kido0617/xxxxxxx.git
cd xxxxxxx
gcloud app deploy app.yaml cron.yaml
cd ../
rm -rf xxxxxx
```

## siteamp.xmlが読めない

`Google XML Sitemaps`プラグインを使用しているのですが、`/sitemap.xml`にアクセスすると`Parse error: syntax error,`でアクセスできず。  
GAE上でファイルは動的に生成できないのでその関係かと思いましたが、このプラグインは動的に生成はしていないようです。  
結果は`short_open_tag`がOnでxmlが読み込めていないのが原因でした。  
php.iniに`short_open_tag = Off`を追加して解決しました。  


