title: 独自のデータをセーブする
date: 2017-04-12
category: RPGツクールMV
---

## はじめに

ツクールMVのセーブデータはjson。正確には以下のコードのようにLZStringライブラリを使って、Base64にしつつ圧縮している。

```javascript
LZString.compressToBase64(json);
```

自分の好きなデータを保存したい場合、既にある$gameSystemとか$gameVariablesといった変数に付け足す方法がある。
デフォルトで入っているアイテム図鑑プラグインのItemBook.jsは$gameSystemを拡張して、アイテムの取得済みかどうかを保存している。以下のようにGame_System($gameSystem)に_itemBookFlagsを追加している。

```javascript
Game_System.prototype.clearItemBook = function() {
  this._ItemBookFlags = [[], [], []];
};
```

この方法でも問題ないが、がっつり独自のセーブデータを作った方がいいケースもある。その方法を解説する。

## DataManagerを拡張

ツクールのセーブする変数は$gameで始まるのでそれにのっとる。今回は、$gameMyというのを作る。
必要なのは、初期化、セーブ、ロード、の３つ。
以下のような感じになる。

```javascript
(function(){
  window.$gameMy = {};

  var _createGameObjects = DataManager.createGameObjects;
  DataManager.createGameObjects = function() {
    _createGameObjects.call(this);
    $gameMy      = new Game_My();
  };

  var _makeSaveContents = DataManager.makeSaveContents;
  DataManager.makeSaveContents = function() {
    var contents = _makeSaveContents.call(this);
    contents.gameMy = $gameMy;
    return contents;
  };
  var _extractSaveContents = DataManager.extractSaveContents;
  DataManager.extractSaveContents = function(contents) {
    _extractSaveContents.call(this, contents);
    $gameMy = contents.gameMy;
  };

  function Game_My(){
    this.saveSomething = "aaa";   //自由にデータを追加できる
  }
})();
```

これでGame_My($gameMy)を通して自由にデータを追加して保存できる。