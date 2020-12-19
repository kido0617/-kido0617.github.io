title: loadBitmapを使うときはsmoothに注意する
date: 2017-04-12
category: RPGツクールMV
---

画像をスクリプトから読み込むときにImageManager.loadBitmapを使う。
これを使って、画像を表示するには以下のようなコードをスクリプトコマンドから実行すれば良い。

```javascript
var bitmap = ImageManager.loadBitmap("img/sample/", "a");
var sprite = new Sprite(bitmap);
SceneManager._scene.addChild(sprite);
```

![画像を表示](/img/2017-04-12-loadbitmap/a.png)


ここで、例えば、画像を80%で表示するとする。そういうときは、spriteのscaleをいじれば良い。
しかし、このままだと縮小された画像にジャギーが発生する。以下のコードと画像を参照。

```javascript
var bitmap = ImageManager.loadBitmap("img/sample/", "a");
var sprite = new Sprite(bitmap);
sprite.scale.x = 0.8;
sprite.scale.y = 0.8;
SceneManager._scene.addChild(sprite);
```

![ジャギーが発生](/img/2017-04-12-loadbitmap/scale-ng.png)

これを抑止するには、loadBitmapの第４引数(smooth)をtrueにすれば良い。第３引数は色相なので使わなければnull。
以下のようにコードを変更すれば、ジャギーなく表示できる。

```javascript
var bitmap = ImageManager.loadBitmap("img/sample/", "a", null, true);
var sprite = new Sprite(bitmap);
sprite.scale.x = 0.8;
sprite.scale.y = 0.8;
SceneManager._scene.addChild(sprite);
```

![ジャギーがない](/img/2017-04-12-loadbitmap/scale-ok.png)

ちなみに、内部的に何が変わるのかという話だけど、Bitmapの以下の箇所で分岐する。

```
if (this._smooth) {
  this._baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
} else {
  this._baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
}
```

PIXIのテクスチャーのscaleModeがLINEARかNEARESTの違い。
多分、バイリニア法かニアレストネイバー法使うかの差っぽい。
それぞれ検索するとどんな感じか出るのでそちらを[参照](https://www.google.co.jp/webhp?q=%E8%A3%9C%E9%96%93+%E3%83%8B%E3%82%A2%E3%83%AC%E3%82%B9%E3%83%88+%E3%83%90%E3%82%A4%E3%83%AA%E3%83%8B%E3%82%A2)。
