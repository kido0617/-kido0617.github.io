title: シーンからマップに場所移動
date: 2017-05-08
category: RPGツクールMV
---

## reserveTransferを使う

独自に作ったシーンからあるマップのある位置に移動するには$gamePlayer.reserveTransferを使う。
このメソッドの詳しい説明は以下のサイトが詳しい。
[ツクールMVのスクリプトで場所移動を行う方法](https://ameblo.jp/rpgmaker1892/entry-12103797314.html)
ただ、Scene_MapからScene_Mapへの移動なら$gamePlayer.reserveTransferを呼び出すだけで移動できるが、
Scene_Map以外のシーンからの移動の場合は、reserveTransferに加えて、SceneManager.goto(Scene_Map)が必要。

```javascript
$gamePlayer.reserveTransfer(6, 1, 1, 8, 0);
SceneManager.goto(Scene_Map);
```

## Map IDの特定方法

ところで、$gamePlayer.reserveTransferの第一引数にMapのIDを渡さなければいけないが、これをどこで確認するか。
2つ方法があり、1つはエディタのマップの編集画面の以下の箇所。
<img src="/img/2017-05-08-reservetransfer/mapid.png"  width="400">

もう1つは data/MapInfos.json を開くとidがわかる。

## Map IDを名前から検索

私はよく使うのだが、マップ名からMAP IDを検索する方法を載せておく。

```javascript
function getMapId(mapName){
  for(var i = 0; i < $dataMapInfos.length; i++){
    if($dataMapInfos[i] && $dataMapInfos[i].name == mapName) return $dataMapInfos[i].id;
  }
  return null;
}
```