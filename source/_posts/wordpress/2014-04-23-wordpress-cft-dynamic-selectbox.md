title: Custom Field Template で 動的にselect box を生成する
date: 2014-04-23
category: WordPress
---

## Custom Field Template の セレクトボックス と DBの連携

Custom Field Template を使っていて、DBの情報でセレクトボックスを生成したいことがあった。
そのため、動的にセレクトボックスを生成する必要がある。
JavaScriptからやるのは、面倒なのでやりたくない。どうにか Custom Field Template の機能でできないものかと検索したら出てきた。

[http://wordpress.org/support/topic/plugin-custom-field-template-dynamic-select-list](http://wordpress.org/support/topic/plugin-custom-field-template-dynamic-select-list)

## PHP CODE オプション

つまり、Custom Field Template の PHP CODE の機能を使うことで実現できる。

```
[something]
type = select
code = 0
selectLabel = 選択してください
```

こういうふうに指定して、Custom Field Template の設定画面にある PHP CODE の 0 番目に以下のように記述すればOK。
$values に optionタグのvalue を、  $valueLabel に optionタグの中身を記述する。

```php
$data =  something() // dbから取得したと仮定
for($i = 0; $i < count($data); $i++){
  $values[$i] = $data['id'];
  $valueLabel[$i] = $data['name'];
}
```