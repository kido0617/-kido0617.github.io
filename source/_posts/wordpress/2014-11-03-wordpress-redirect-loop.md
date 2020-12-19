title: SSLサイトのWordPressでリダイレクトループのためログインできない
date: 2014-11-03
category: WordPress
---

## 現象

wp-config.phpに以下を記述すると、強制的に管理画面をSSLにすることができる。これを有効にしたところ、リダイレクトループが発生してしまい、ログインできなくなってしまった。

```php
define('FORCE_SSL_ADMIN', true);
```

## 原因

原因としては、SSL判定が正しくなかったからである。WordPress内では以下のような is_ssl() というメソッドが用意されている。
これは $_SERVER['HTTPS']と $_SERVER['SERVER_PORT'] を見て、SSLかどうかチェックを行っている。

```php
function is_ssl() {
  if ( isset($_SERVER['HTTPS']) ) {
    if ( 'on' == strtolower($_SERVER['HTTPS']) )
      return true;
    if ( '1' == $_SERVER['HTTPS'] )
      return true;
  } elseif ( isset($_SERVER['SERVER_PORT']) &amp;&amp; ( '443' == $_SERVER['SERVER_PORT'] ) ) {
    return true;
  }
  return false;
}
```

実はWordPressを設置した環境が、ロードバランサでSSLを受けて、サーバ側はHTTPでリクエストを受けるような構成のため、
$_SERVER['HTTPS']はonにならないのである。その代わりに $_SERVER['HTTP_X_FORWARDED_PROTO'] で判定をする必要がある。

## 解決策

[Administration Over SSL](http://codex.wordpress.org/Administration_Over_SSL)のリバースプロキシを使った例の「Using a Reverse Proxy」のところに解決策が載っている。
wp-config.php に以下を記載するだけ。$_SERVER['HTTPS']を書き換えるってどうなんだ？と思わなくもないが。

```php
define('FORCE_SSL_ADMIN', true);
if ($_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https')
  $_SERVER['HTTPS']='on';
```