title: 全てのアイテムを取得するプラグイン
date: 2017-04-13
category: RPGツクールMV
---

デバッグ用で、ゲーム開始時に全てのアイテム、武器、防具を取得済みの状態で始めたかった。
探せばあるような気がするんだけど、探しても見つからなかったのでプラグインを制作した。

下記からダウンロードできます。
<https://raw.githubusercontent.com/kido0617/rpgmakerMV-plugin/master/GetAlIItems/GetAllItems.js>

プラグインコマンドで以下のようにして使う。
それぞれ全アイテムを99個獲得、全武器を1個獲得、全防具を10個獲得の意味。

```
GetAllItems item 99
GetAllItems weapon 1
GetAllItems armor 10
```

こんな感じにゲーム開始時にそれぞれ取得するように書いておけば、全所持状態から開始できる。
![](/img/2017-04-13-get-all-items/get-all-items.png)


## ライセンス

Released under the MIT license