title: コンフィグ画面を右クリックで戻るようにするプラグイン
date: 2018-12-29
category: ティラノスクリプト
---

## はじめに

セーブやロード画面は右クリックで前の画面に戻れるのですが、独自に作ったコンフィグ画面に関してはそうはなりません。  
コンフィグ画面も右クリックで戻れるようにしたいとの要望で作ったプラグインです。  
`ティラノスクリプト バージョン471b`で動作を確認しています。


## 概要

コンフィグ画面から右クリックで戻るを実現するには、右クリックを押した時に、画面上の戻るボタンが押されたのと同じ動作をすれば良いです。そのためのプラグインを作りました。  

ダウンロードは[こちら](https://github.com/kido0617/tyrano-plugin/archive/master.zip)  
いろいろ入っていますが`rightClickButton`というフォルダが今回のプラグインです。

画面上のボタンのnameに`rightClickButton`を設定すると、右クリック時にそのボタンが押されたのと同じ動作になります。

設定例
```
[button graphic="back.png" name="rightClickButton" fix=true target="backtitle" x=800 y=100]
```

すでにname属性を使用している場合は、以下のように`,`で区切って指定してください。  
`name="test,rightClickButton"`


## ライセンス

Released under the MIT license