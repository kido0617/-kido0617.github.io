title: ここにタイトルを入力 を変更する
date: 2014-08-04
category: WordPress
---

タイトルのプレースホルダーに「ここにタイトルを入力」とあるのを変更したい。
custom post type を使っていると、入力するのがタイトルじゃなかったり、プレースホルダーにもう少し説明を加えたいことがあるからだ。
function.php で enter_title_here をフックして、以下のように記述すればOK。

```php
add_filter( 'enter_title_here', function($title){
  global $post_type;
  if($post_type == 'food'){
    $title = '食べ物の名前を入力してください（例：ステーキ）';
  }else if($post_type == 'dessert'){
    $title = 'デザートの名前を入力してください（例：アイスクリーム）';
  }else{
    $title = 'タイトルを入力してください';
  }
  return $title;
});
```