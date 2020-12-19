title: ウィンドウをたくさん出すプラグイン
date: 2017-07-14
category: RPGツクールMV
---

ウィンドウを画面にたくさん出したら何かに使えるかなぁと思い、作った。

![ウィンドウたくさん出す](/img/2017-07-14-window-manager/windowmanager.gif)

ダウンロードは↓から
<https://raw.githubusercontent.com/kido0617/rpgmakerMV-plugin/master/WindowManager/WindowManager.js>

## 使用方法

プラグインを追加したら、スクリプトコマンドで以下のようにします。

```javascript
WindowManager.show(0, 10, 10,180, 80);  //0番目のウィンドウを x=10,y=10の座標で 180の幅、80の高さで表示
WindowManager.drawText(0, "あいうえお");  //0番目のウィンドウに あいうえお と表示
```

![スクリプト例](/img/2017-07-14-window-manager/script.png)

画像出したいときは以下のような感じ
```
WindowManager.show(3, 400, 200, 300, 300);
WindowManager.drawPicture(3, 'cat');     //Pictureの名前がcatの画像を表示
```

制御文字使いたい場合は、\を２つ重ねて使う。
```javascript
WindowManager.drawText(0, "\\I[1]あいうえお"); 
```

## 制限事項

インスタントにウィンドウを出すだけなので、マップ移動したりメニューを開いたりすると、ウィンドウは消えます。

## ライセンス

Released under the MIT license