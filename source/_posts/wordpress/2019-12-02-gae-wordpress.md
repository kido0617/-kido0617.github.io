title: GAEのサブディレクトリでWordPressを動かす
date: 2019-12-02
category: WordPress
---

GAE Standard の PHP7環境の話です。

## サービスの分割

GAEでLaravelを動かしていますが、そこにブログの機能を追加したい要望が出ました。  
その際、`/blog`のサブディレクトリで動かすことが条件でした。  
Laravelのpublicフォルダ下にWordPressを設置することもできますが、メンテナンスも考えて今回は分離して運用します。  
GAEはサービスという単位でディレクトリごとに復数のプロダクトを動かすことができます。
以下のドキュメントが詳しいです。  
[dispatch.yaml 構成ファイル | App Engine スタンダード環境での PHP 7.2 に関するドキュメント](https://cloud.google.com/appengine/docs/standard/php7/reference/dispatch-yaml?hl=ja)
ドキュメントに従い、dispatch.yamlを以下のように記述し、デプロイしました。  
これで、wpというservice名でblog配下を配信できる準備ができました。  

```yaml
dispatch:
  - url: "*/blog*"
    service: wp
```

## WordPressプロジェクトのダウンロード
  
以下のドキュメントに従い、ダウンロード、インストールしていきます。手順通り実行すれば、GAEで動作するように設定されたWordPressがダウンロードされます。  
このドキュメントはルート直下にインストールすることを前提にしているのでダウンロード後に設定を変えます。  
　

[Run WordPress on Google App Engine standard environment](https://cloud.google.com/community/tutorials/run-wordpress-on-appengine-standard?hl=ja)

## wp-config.phpの修正

まず、`wp-config.php`です。サイトのURLとホームを`/blog`ありにします。

```php
//元々
define('WP_SITEURL', $protocol_to_use . HTTP_HOST);
define('WP_HOME', $protocol_to_use . HTTP_HOST);

↓

// /blog/を追加
define('WP_SITEURL', $protocol_to_use . HTTP_HOST. '/blog/');
define('WP_HOME', $protocol_to_use . HTTP_HOST. '/blog/');
```

## gae-app.phpの修正

次に`gae-app.php`を修正します。GAEで動かした際にまずこのファイルにアクセスが割り振られます。  
このWordPressはURL的には`/blog`配下ですが、サービス的にはルート直下にインストールされるので、その差を修正します。  

```php
//元々
$file = get_real_file_to_load($_SERVER['REQUEST_URI']);

↓

// リクエストは /blogつきでくるが、サーバ上のファイルは/blogはないので、消す
$uri = preg_replace('/\/blog/', '', $_SERVER['REQUEST_URI'], 1);
$file = get_real_file_to_load($uri);
```

## app.yamlの修正

最後に`app.yaml`を以下のように修正します。

```yaml

# App Engine runtime configuration
runtime: php72

#デプロイ先の指定
service: wp

entrypoint: serve gae-app.php

#それぞれのurlに/blogを追加します
handlers:
- url: /blog/(.*\.(htm|html|css|js))
  static_files: \1
  upload: .*\.(htm|html|css|js)$

- url: /blog/wp-content/(.*\.(ico|jpg|jpeg|png|gif|woff|ttf|otf|eot|svg))
  static_files: wp-content/\1
  upload: wp-content/.*\.(ico|jpg|jpeg|png|gif|woff|ttf|otf|eot|svg)$

- url: /blog/(.*\.(ico|jpg|jpeg|png|gif|woff|ttf|otf|eot|svg))
  static_files: \1
  upload: .*\.(ico|jpg|jpeg|png|gif|woff|ttf|otf|eot|svg)$

- url: /blog/wp-includes/images/media/(.*\.(ico|jpg|jpeg|png|gif|woff|ttf|otf|eot|svg))
  static_files: wp-includes/images/media/\1
  upload: wp-includes/images/media/.*\.(ico|jpg|jpeg|png|gif|woff|ttf|otf|eot|svg)$

```

## デプロイ

あとはドキュメントどおり、 `gcloud app deploy app.yaml cron.yaml`　すればOKでした。

余談ですが、Laravel側でWordPressの記事を表示したいとの要望があり、その連携はAPIを作って、連携しています。