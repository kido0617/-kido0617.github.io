title: Custom Field Template の FILE の バリデーション
date: 2014-03-21
category: WordPress
---

## Custom Field Templateのバリデーション

非常にニッチな話だけど、Custom Field Templateの FILE のバリデーションのTips。

Custom Field Templateは、グローバル設定の「jQuery バリデーションを使用する」にチェックを入れるとバリデーションを利用することができる。
この状態で、以下のようにclassに jquery-validationで利用できるやつを指定するとバリデーションしてくれる。
この例だと required なので入力が必須ということになる。

[image]
type = file
label=写真
class= required

## FILEのバリデーション

問題はここから。
この状態で一度ファイルをアップロードして保存する。
その後、編集をもう一度したとき、requiredが効いてしまい、何かしらのファイルをアップロードしないとバリデーションが通らないのだ。
これは困る。ファイル以外の項目を編集したいのにできないからだ。
仕方ないので、jquery-validateに独自のvalidationを定義することにする。

## jquery-validateに独自バリデーションの追加

準備として、functions.phpで js ファイルを読み込むようにして、そちらのjsファイルに記述する。

```php
add_action('admin_head', function(){
  echo '<script type="text/javascript" src="'.get_bloginfo('template_directory').'/admin.js"></script>';
});
```


以下、jsファイル内の記述。今回、独自の定義として requiredFile を定義する。

```javascript
(function($){
  $(function(){
    //ファイル用に独自のvalidationを追加
    $.validator.addMethod("requiredFile", function(value, element) {
      if(value !== '') return true;
      //CFT では FILEが保存済みの場合、兄弟要素のhiddenのinputフィールドに値が入力されているので、それをチェックする。
      if($(element).siblings('input:eq(0)').val() !== '')return true;  

      return false; 
    }, "必須項目です。");
  });
})(jQuery);
```


これで、あとは作った定義のclassをくっつける。

[image]
type = file
label=写真
class= requiredFile