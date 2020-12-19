title: デバッグ画面にショートカットキーを追加するプラグイン
date: 2018-07-04
category: RPGツクールMV
---

この記事はMV版です。VXAce版は[こちら](/rpgmaker/2018-07-05-debug-shortcut-vxace/)

## 概要

F9で表示するデバッグウィンドウはスイッチと変数の切り替えが面倒なので、ショートカットキーを追加します。

* `Sキー`  スイッチの先頭に飛ぶ
* `Vキー`  変数の先頭に飛ぶ
* `数字キー` 入力した番号に飛ぶ

例1: `s100` と入力するとスイッチの100番目に飛ぶ  
例2: `v12` と入力すると変数の12番目に飛ぶ  

Backspaceキーも使えます。

使用感はこんな感じです。
<video src="/img/2018-07-04-debug-shortcut/debug-shortcut.mp4" width="816" height="624" controls></video>

## ダウンロード

[こちらから](https://raw.githubusercontent.com/kido0617/rpgmakerMV-plugin/master/DebugWindowShortCut/DebugWindowShortCut.js)

## 注意事項

キーマップに `S` `V` `0～9` `BackSpace` キーを登録するのでこれらを使うプラグインを使用している場合、競合起こす可能性がある気がします。
私は `Input.keyMapper[8] = 'BackSpace'` と登録していますが、他のプラグインが`BackSpace`を`backspace`みたいに登録しているとどっちかが動かないことが起こります。

## ライセンス

Released under the MIT license