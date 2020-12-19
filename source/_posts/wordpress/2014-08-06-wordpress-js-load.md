title: 管理画面でbodyの終わりにjsファイルを読む
date: 2014-08-06
category: WordPress
---

WordPressの管理画面で独自のjsファイルを読み込むテクニックとして、admin_head をフックしてそこで jsファイルを読むというのがある。
ただ、これだとヘッダで読み込まれるため、WordPressで使用されている他のjsファイルの前に読み込まれてしまい、ちょっと困った。
できれば、bodyタグの終わりにjsファイルを読みたい。

そこで、[wp_enqueue_script](http://codex.wordpress.org/Function_Reference/wp_enqueue_script)を使う。
れの引数に $in_footer というのがあり、これをtrueにすると bodyタグの終わりのところで読み込んでくれる。

こんな感じに使う。
```php
add_action( 'admin_enqueue_scripts', function() {
  wp_enqueue_script('admin-js', get_bloginfo('template_directory').'/js/admin.js', array(), '1.0', true);
});
```