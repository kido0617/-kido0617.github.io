title: post_name に連番を付与する
date: 2014-08-13
category: WordPress
---

あるpost_typeに限り、1から始まる連番を付与したい。
やり方としては、name_save_preをフックしてやる。保存されているpost_nameの最大値+1を保存していけば、連番になる。
これなら途中で削除などされた場合も問題なく連番（穴抜けは生じるが）になるだろう。

```php
add_filter('name_save_pre', function($title) {
  global $wpdb, $post;
  if($_POST['post_type'] =='some_post_type')){
     //公開にしたときだけ連番を付与したいので、これらは除外
    if(in_array($_POST['post_status'], array( 'draft', 'pending', 'auto-draft' )))return $title;
    //すでにpost_nameが設定されていたらそれを返す
    if($post->post_name != "") return $post->post_name;
 
    //post_nameはstringなのでcastする。
    $max = $wpdb->get_var($wpdb->prepare("SELECT MAX(cast(post_name as unsigned)) FROM $wpdb->posts WHERE 
                           post_type = %s;", $_POST['post_type']));
    //念のため、必ずuniqueのpost_nameになるwp_unique_post_slug を通す
    return wp_unique_post_slug($max + 1, $_POST['ID'], $_POST['post_status'], $_POST['post_type'], $post->post_parent );
  }

  return $title;
  
});

```