title: ウィンドウに画像を表示する
date: 2017-05-03
category: RPGツクールMV
---

ウィンドウに画像を表示するには簡単にいうと2つ方法があります。
それぞれ解説します。

## Spriteを作る方法

Spriteを作ってウィンドウにaddChildするだけで表示できます。
このSpriteはPIXIのSpriteを継承しているので、そのメソッドなどを使えます。
[PIXI.Sprite](http://pixijs.download/release/docs/PIXI.Sprite.html)

``` javascript
var sprite = new Sprite();
sprite.bitmap = ImageManager.loadBitmap('img/path/', 'image-name');
sprite.x = 100;
sprite.y = 100;
this.addChild(sprite);
```

## contents.blt を使用する方法

Window_Baseはメンバーにcontentsを持っており、このbltメソッドで表示できます。
ただし、このとき指定するbitmapはロード済みでないと表示できません。キャッシュにあれば表示できます。
そこで、bitmapのロードイベントにfunctionを登録してロード完了後にbltを呼び出す方法があります。

```javascript
var bitmap = ImageManager.loadBitmap('img/path/', 'image-name');
bitmap.addLoadListener(function() {
  this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, rect.x, rect.y, rect.width, rect.height);
}.bind(this));
```