title: 一括入力がしやすいテキストエディタプラグインの紹介
date: 2017-09-18
category: RPGツクールMV
---

## 概要

ツクールのメッセージの一括入力用に４行ごとにボーダーが引かれるVisual Studio Codeのプラグインを作りました。
メッセージを一度テキストエディタでどばっと書いて一括入力で流し込むケースがあると思います。
そのとき、4行区切りになっていると便利だというニーズがあったからです。

![4行ごとにボーダーが引かれるエディタ](/img/2017-09-18-texteditor/screenshot.png)

## インストール

まず、[Visual Studio Code](https://code.visualstudio.com/)をダウンロードします。フリーのマイクロソフト製のエディタです。
インストールしたら起動して、プラグインのインストールボタンを押します。

![プラグインのインストールボタン](/img/2017-09-18-texteditor/plugin.png)

入力欄に rpgmaker と入力すると rpgmaker-text というプラグインが表示されるのでインストールします。
インストールしたら再読込しましょう。これで有効になっているはずです。

![rpgmaker-textをインストール](/img/2017-09-18-texteditor/rpgmaker-text.png)

## TIPS

機能をOFFにしたいときは、Ctrl + Shift + P で表示されるコマンド欄でrpgmaker-text:Toggleを選択すればON/OFFを切り替えられます。

![On/OFFの切り替え](/img/2017-09-18-texteditor/toggle.png)