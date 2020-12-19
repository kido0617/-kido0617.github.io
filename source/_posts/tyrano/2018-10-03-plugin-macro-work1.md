title: 最近作ったティラノスクリプトのプラグインとマクロ
date: 2018-10-03
category: ティラノスクリプト
---

## はじめに

最近頼まれて作ったティラノスクリプトのプラグインとマクロたちをまとめました。  
限定的な用途のものも結構あります。  
`ティラノスクリプト バージョン471b`で動作を確認しています。


## 自動的に喋っているキャラが前面に来るプラグイン

`chara_config`タグを使うと喋っているキャラの明るさを変えるような演出はできます。  
それに加えて、喋っているキャラを前面にする機能を追加します。  
喋っているキャラの`z-index`をキャラ内で最大にします。

ダウンロードは[こちら](https://github.com/kido0617/tyrano-plugin/archive/master.zip)  
`targetFocusZIndex`というフォルダが自動的に喋っているキャラが前面に来るプラグインです。

導入するだけで機能は有効になりますが、On、Offする機能があります。  
・OFFにしたいとき  
`[offTargetFocusZIndex]`

・OFFからONにしたいとき  
`[onTargetFocusZIndex]`

## アニメーション待ちのカウントを0にしてフリーズを抑止するマクロ

前に[アニメーション待ちのwaタグでフリーズするケース](/tyrano/2018-09-10-wa-freeze/)で説明しました。  
 `wa`タグはアニメーションしている数が0になるまで待つタグですが、そのアニメーションしている数が0にならないケースが存在し、フリーズします。  
そこで、強制的にこの数を0にするのがこのマクロです。  
シーンの遷移時に呼ぶことによって、アニメーションが完了しない不慮の事態を別のシーンに持ち越すことがなくなります。

```
[macro name="clearAnimCount"]
[eval exp="TYRANO.kag.tmp.num_anim=0"]
[endmacro]
```


## cmだとbuttonが全て消えてしまうので、一部だけ消すマクロ

`button`タグはすべてフリーレイヤーに配置され、`cm`タグを呼ぶことによって消去されます。  
しかし、一部のボタンだけ消したいケースがあったため、`button`タグの`name`を指定して`button`を消すマクロを用意しました。  

```
[macro name="cfl"]
[iscript]
var fl = TYRANO.kag.layer.getFreeLayer();
if(mp.include) {
  fl.find("." + mp.include).remove();
}else if(mp.exclude){
  fl.find(":not(." + mp.exclude + ")").remove();
}
[endscript]
[endmacro]
```

例えば、以下のような`button`タグがあったとき、group1のボタンだけ消したい場合は、  
`[cfl include="group1"]` とします。  
逆にgroup1以外を消したい場合は、  
`[cfl exclude="group1"]` とします。  

```
[button graphic="button1.png" x="100" y="100"  target="t1" name="btn1,group1"]
[button graphic="button1.png" x="100" y="200"  target="t2" name="btn2,group1"]
[button graphic="button1.png" x="100" y="300"  target="t3" name="btn3,group2"]
[button graphic="button1.png" x="100" y="400"  target="t4" name="btn4,group2"]
```




## キャラのz-indexを変えるマクロ

`chara_show`でキャラを登場時にz-indexを指定することはできますが、途中で変えたいという要望に対応したマクロです。

```
[macro name="charaZIndex"]
[iscript]
if(mp.name && mp.z){
  $("." + mp.name).css('z-index', mp.z);
}
[endscript]
[endmacro]
```

マクロは以下のように使います。  
`[charaZIndex name="akane" z=10]`


## buttonホバー時にx,y座標を変えるプラグイン

buttonタグのホバー時にx,y座標を変更するプラグインです。  
buttonタグのパラメータに enterimgXとenterimgYを追加。  
座標は現在座標からの相対位置になります。  

使用例: 
`[button x=100 y=150 graphic="button1.png" target="gamestart" enterimg="button2.png" enterimgX="-20" enterimgY="-10"]`

ダウンロードは[こちら](https://github.com/kido0617/tyrano-plugin/archive/master.zip)  
`enterimgExtension`というフォルダがbuttonホバー時にx,y座標を変えるプラグインです。

## すべてのボタンのクリックを抑止するプラグイン

画面に透明な壁を作り、ボタンなどのクリックを吸収し、すべてのボタンに対するクリックを無効にします。

`[preventClick]` で発動し、`[preventClick off=true]` で解除です。


ダウンロードは[こちら](https://github.com/kido0617/tyrano-plugin/archive/master.zip)  
`preventClick`というフォルダがすべてのボタンのクリックを抑止するプラグインです。

## ボタンクリック時にウェイトを挟むので、その間ボタンを連打できなくするプラグイン

ボタンをクリックしてすぐに遷移するのではなく、アニメーションをしてから遷移したいというニーズに対応したときに作ったプラグイン。  
以下のようにアニメーションしてウェイト挟んでからjumpするようなイメージ。  
この場合、ウェイト中にボタンをクリックすると何度もイベントが発行されてしまい困るということです。  

```
[anim name="anim" left="+=300" opacity="255" effect="jswing" time=1000]
[wait time=1000]
[jump storage=scene.ks]
```

`wait`と同じ機能で`button`タグのクリックを無効にする`waitNoClick`タグを追加しました。  
ただし、role指定の`button`には対応していません。

```
[anim name="anim" left="+=300" opacity="255" effect="jswing" time=1000]
[waitNoClick time=1000]
[jump storage=scene.ks]
```

ダウンロードは[こちら](https://github.com/kido0617/tyrano-plugin/archive/master.zip)  
`waitNoClick`というフォルダがウェイト中にボタンを連打できなくするプラグインです。


## ライセンス

Released under the MIT license