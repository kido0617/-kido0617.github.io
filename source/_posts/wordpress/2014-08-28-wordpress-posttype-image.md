title: post_typeによって生成する画像を変える
date: 2014-08-28
category: WordPress
---

Wordpressでは画像をアップロードすると、設定のメディアで指定したサイズに画像を縮小してくれる。
サムネイル、中、大と３つ作られるのだが、post_typeによってはサムネイルだけ作りたかったり、そもそも別のサイズの画像を作る必要がなかったりするケースがある。

post_typeによって作る画像のサイズを変えるには intermediate_image_sizes をフックする。
これには作られる画像のサイズの名前がarrayで渡ってくる。 例： array('thumbnail', 'medium', 'large')
このarray を書き換えることによって画像を生成するかどうか変更できる。

```php
add_filter( 'intermediate_image_sizes', function ( $image_sizes ){
  if($_POST['post_type'] == 'some_post_type' ){
    return array('thumbnail');   //サムネイルだけ作る
  }
  return $image_sizes;
}, 999 );
```


参考
[Removing Image Sizes for Custom Post Type](http://wordpress.stackexchange.com/questions/131497/removing-image-sizes-for-custom-post-type)

