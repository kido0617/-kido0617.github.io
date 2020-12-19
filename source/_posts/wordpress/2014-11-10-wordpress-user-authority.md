title: ユーザの権限で管理画面をカスタマイズする
date: 2014-11-10
category: WordPress
---

## 権限グループによる分岐

WordPress はデフォルトで5つの権限グループがある。
今回、その権限グループのうち、管理者でのみ表示する項目があり、管理画面をカスタマイズする必要があった。
functions.phpにログイン中のユーザが管理者であるかどうかをチェックして、処理を変えれば良い。
そのための関数が current_user_can である。

参考
[Wordpress capabilities and current_user_can() in functions.php](http://stackoverflow.com/questions/13404284/wordpress-capabilities-and-current-user-can-in-functions-php)

```php
if( current_user_can( 'administrator' ) ){}   //管理者のみ
if( current_user_can( 'editor' ) ){}          //編集者のみ
if( current_user_can( 'author' ) ){}          //投稿者のみ
if( current_user_can( 'contributor' ) ){}     //寄稿者のみ
if( current_user_can( 'subscriber' ) ){}      //購読者のみ
```

## 権限グループの削除


上記にあるように、権限グループはデフォルトで5つある。場合によっては、いらない権限もある。
いっそ非表示にしたい場合は、editable_rolesフィルターをフックすれば良い。
参考
[Allow users to add new users, but not above their role](https://mu.wordpress.org/forums/topic/14342)

```php
function filter_editable_roles($roles) {
  unset ($roles['subscriber']);     //購読者を削除
  return $roles;
}
add_filter('editable_roles', 'filter_editable_roles');
```

## 権限グループの細かな設定

ちなみに、各権限グループを細かにカスタマイズしたい場合は、User Role Editor というプラグインがあるらしい。
[WordPressで複数の会員が独自のページを作成し、内容を管理・更新できるようにする方法。→プラグイン「User Role Editor」を使う](http://tontotakumi.com/web-seisaku/multi-login/)
こちらは使ったことないので、使い勝手はわからないけど、参考までに。