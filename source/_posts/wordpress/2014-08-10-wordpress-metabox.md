title: metaboxをドラッグしたり折りたためなくする方法
date: 2014-08-10
category: WordPress
---

## はじめに

wordpressの投稿画面の各メタボックス(公開とかフォーマットとかカテゴリとか）はドラッグで移動可能だし、クリックすると折りたたむことができる。
今回はそれを無効化したい。

ネットで調べると、以下のようにpostboxスクリプトをwp_deregister_script しているコードが見受けられる。しかし、これだと、公開状態を変える際のjs処理も除外されてしまい、まともに動かなくなってしまった。

```php
function remove_postbox() {
    wp_deregister_script('postbox');
}
add_action( 'admin_init', 'remove_postbox' );
```

## JavaScript と CSS で無効化

仕方ないので、JavaScriptとCSSでこの機能をなくすことを目指す。
とりあえず、[管理画面でbodyの終わりにjsファイルを読む](/wordpress/2014-08-06-wordpress-js-load)のようにしてjsファイルをbodyタグ終わりで読み込む。


そして、以下のようにして無効化する。
```javascript
jQuery(function($){
  //metaboxのドラッグを無効にする
  $('.meta-box-sortables').sortable({
    disabled: true
  });
  //metaboxのクリックで折りたたむのを無効にする
  $('.postbox h3').unbind('click.postboxes');
});
```

## 見た目の修正

最後に、このままだとポインターを合わせた時にカーソルが変わってしまうので、それを元に戻す。あと折りたたみの▲ボタンも消す。
これはcssから行うので、[管理画面のいらないものを消す](/wordpress/2014-03-09-wordpress-hidden)のようにしてcssファイルを読めるようにして、そちらに記述する。

```css
/*metaboxのカーソルをデフォルトに戻す*/
.js .postbox .hndle,
.js .postbox h3{
  cursor:default;
}

/*▼の表示を消す*/
.js .postbox .handlediv {
  display: none;  
}
```