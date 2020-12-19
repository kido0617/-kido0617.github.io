title: 削除時のフック delete_post
date: 2014-03-23
category: WordPress
---

投稿が削除されたときに、それをフックして処理を行う必要があった。
というのも、その投稿を参照している別の独自のテーブルがあってそれも削除したかったからである。
削除にはいくつかフックがあるが、削除直前にフックできる delete_post を使用する。
完全に削除した後だと、削除する投稿の情報が取れない。

以下のように、add_actionで delete_postを指定する。引数に削除される投稿のpost_idが来るので、get_post でそのidの投稿を取得して処理を行うことができる。

```php
add_action('delete_post', function($post_id){
  $deletePost = get_post($post_id);
  // do something
```