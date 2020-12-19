title: プレビューのリンク先を変更する
date: 2014-08-05
category: WordPress
---

custom post type によってプレビューの先を変更したいケースがある。
そういう場合は、preview_post_link をフックする。これには元のプレビュー先のurlが渡ってくるのでこれを好きに加工すれば良い。
デフォルトでは、以下のようにpost_typeとid、preview=trueというパラメータが入っている。
```
http://example.com/wordpress/?post_type=food&p=10&preview=true
```


```php
add_filter( 'preview_post_link', function($link) {
  global $post_type
  if($post_type == 'food'){
    //$link を適当に加工
  }
  return $link;
});

```