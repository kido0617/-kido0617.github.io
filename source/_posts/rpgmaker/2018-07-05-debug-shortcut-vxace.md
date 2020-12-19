title: デバッグ画面にショートカットキーを追加するスクリプト(VXAce版)
date: 2018-07-05
category: RPGツクールVXAce
---

この記事はVXAce版です。MV版は[こちら](/rpgmaker/2018-07-04-debug-shortcut/)

## 概要

F9で表示するデバッグウィンドウはスイッチと変数の切り替えが面倒なので、ショートカットキーを追加します。

* `Sキー`  スイッチの先頭に飛ぶ
* `Vキー`  変数の先頭に飛ぶ
* `数字キー` 入力した番号に飛ぶ

例1: `s100` と入力するとスイッチの100番目に飛ぶ  
例2: `v12` と入力すると変数の12番目に飛ぶ  

Backspaceキーも使えます。

使用感はこんな感じです。
<video src="/img/2018-07-05-debug-shortcut-vxace/debug-shortcut.mp4" width="816" height="624" controls></video>

## ダウンロード

[こちらから](https://raw.githubusercontent.com/kido0617/rpgmakerVXAce-plugin/master/debug-shortcut/debug-shortcut.rb)

## ライセンス

Released under the MIT license