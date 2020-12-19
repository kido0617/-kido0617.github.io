title: Intervention Imageで復数解像度の画像を出力する
date: 2019-12-08
category: PHP
---

`Intervention Image`で画像を加工しているのですが、いろんな解像度の画像を出力する必要がありました。  
一度、resizeやfitなどすると読み込んでいる画像を書き換えてしまうので、連続して出力できません。  
読み込み直すのも微妙だと思っていたのですが、`backup`と`restore`をすれば加工前に戻ることができるようです。  
サンプルソースも含めて、以下のドキュメントに記載ありました。  

[Intervention Image - Reset](http://image.intervention.io/api/reset)