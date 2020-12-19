title: 管理画面のいらないものを消す
date: 2014-03-09
category: WordPress
---

wordpressの管理画面で使わないものを消したい。個人で使うならいいが、お客さんに納品するときなど、触れてほしくない機能は見せたくないからだ。
機能を止めることによって項目を消すこともできるが、細かいところはcssで消していくしかない。
まず、消す用のcssを読み込む。

```php
//functions.php

function my_admin_head(){
  echo '<link rel="stylesheet" type="text/css" href="' .get_bloginfo('template_directory'). '/admin-style.css' . '" />';
}
add_action('admin_head', 'my_admin_head');
```

functions.phpと同じフォルダに admin-style.css を置いておいて、それを読み込む。get_bloginfoで現在のテンプレートのディレクトリを参照できる。
これで管理ページで共通のcssを読み込めるようになった。

あとはhtmlのidやclassを見て、それをdisplay:none;で消せばOK。

```css
/* プレビューボタンを消す*/
#post-preview{
  display: none;
}
```