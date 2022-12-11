title: 簡易ログメッセージプラグイン
date: 2022-12-11
category: RPGツクールMZ
---

簡易的にログメッセージを表示するプラグインを製作しました。

<video src="/img/2022-12-11-logmessage/logmessage.mp4" width="720" height="480" controls></video>

以下のような感じでプラグインコマンドから指定します。  
最初に初期化コマンドから表示位置とサイズを指定し実行します。  
その後はメッセージ追加もコマンドからテキストを追加します。  

![コマンド例](/img/2022-12-11-logmessage/command.png)


ダウンロードは[こちら](https://raw.githubusercontent.com/kido0617/rpgmakerMZ-plugin/main/LogMessage/LogMessage.js)

## 制限事項

演出で使用することを想定しているので、マップを移動したり、メニューを表示したら消えます。


## ライセンス

Released under the MIT license