title: SpineのSkeletonAnimationとSkeletonMecanimについて
date: 2021-06-24
category: Unity
---

基本的に以下のURLのドキュメントを参考にしています。  
* [spine-unity Runtime Documentation](http://ja.esotericsoftware.com/spine-unity)
* [Spine Runtimesガイド](http://ja.esotericsoftware.com/spine-runtimes-guide)  

## Unityで使用するSpineコンポーネント

UnityでSpineで作成したアニメーションを再生するためのコンポーネントとして以下の3つが用意されています。  

* SkeletonAnimation
* SkeletonGraphic (UI) 
* SkeletonMecanim

SkeletonGraphic (UI)に関しては名前のとおりUGUIのcanvasに使用するものなので用途は限られているのですが、問題はSkeletonAnimationとSkeletonMecanimです。  
Spineのアニメーションを再生するにはどちらかを使う必要がありますが、調べたり実装したりして考えたことを書いておきます。


## SkeletonAnimation or SkeletonMecanim

公式で推奨されているのはSkeletonAnimationですが、それぞれ比べていきます。

### アニメーションの再現

Mecanimを使用した場合、Spineのエディタのプレビューで再生したものと同じになることを保証しない記載があります。
また、アニメーション間のトランジションを最初のフレームに追加のキーを設定する必要があります。  
それらのキーはExport時にオプションの Animation clean up をONにすると消されるので、そのオプションはMecanimの場合使用できません。  
詳しくは[こちら](http://esotericsoftware.com/spine-unity#Required-Additional-Keys)

トランジションはただでさえ、見た目を整える難しさがあるので、さらに考慮すべき項目が増えるのはちょっとしんどい印象です。

### 機能面

* トラック  
   SkeletonAnimation : アニメーション再生のAPI使用時に指定する  
   SkeletonMecanim : Animatorウィンドウのレイヤーで指定する

* ミックス
  SkeletonAnimation : Skeleton Data Assetで設定しておくか、アニメーション再生時TrackEntryを介して指定する  
  SkeletonMecanim : AnimatorウィンドウのTransitionの各値で設定する

* アルファ
  SkeletonAnimation : アニメーション再生時TrackEntryを介して指定する  
  SkeletonMecanim : レイヤーのweightで指定する

* Spineで設定したイベント
  SkeletonAnimation : AnimationStateのEventのdelegateに追加して受け取る  
  SkeletonMecanim : Animation Clipのイベントとして設定される

どちらも基本的な機能は備えています。  

SkeletonAnimationは[started, interrupted, completed, ended, disposed](http://ja.esotericsoftware.com/spine-unity#Processing-AnimationState-Events)といった5つのイベントを受け取ることができ、アニメーション再生時のイベントの扱いが便利そうだと思いました。  

また、SkeletonAnimationは[TrackEntry](http://ja.esotericsoftware.com/spine-api-reference#TrackEntry)を介したアニメーションの細かい設定ができる点も気になります。  
attachmentのON/OFFやdrawOrderの順番の変更、eventの発火といった徐々に変化せずミックスができない項目に対してしきい値を設定できます。  


### パフォーマンス面

SkeletonMecanimはSkeletonAnimatonに比べるとパフォーマンスで劣るそうです。  
ゲームプレイに影響ある程ではないと思いますが、以下のフォーラムで書かれているように大量に生成したときにパフォーマンスに差が出たという話があります。  
[Performance Analysis of Mecanim vs Animation](http://ja.esotericsoftware.com/forum/Performance-Analysis-of-Mecanim-vs-Animation-15046)

両者の差がパフォーマンスにとってクリティカルになるケースは稀な気がします。  
正直多少のパフォーマンスを犠牲にしてでもMecanimのようにGUIでアニメーションの遷移を設定出来たほうが良いという気持ちはあります。  



### ステートマシン

Mecanimを使う最大のメリットはやはりGUIでアニメーションの遷移を定義できることです。  
スパゲッティな遷移になりがちとはいえ、アニメーションの遷移をステートマシンで表現できるのは強みです。  
逆にSkeletonAnimationを使う際の一番の問題点はこれで、アニメーションを変化させるのにプログラムからAPIを呼ぶしかないのです。  
SkeletonAnimationを使いつつ、Mecanimnのようなステートマシンを使いたいというニーズはあり、以下のフォーラムのように[NodeCanvas](https://assetstore.unity.com/packages/tools/visual-scripting/nodecanvas-14914?locale=ja-JP)というアセットを使う方法が提案されています。  

[Spine + NodeCanvas?](http://ja.esotericsoftware.com/forum/Spine-NodeCanvas-6366)

NodeCanvasは少し高価ですが、触った感じ、確かにステートマシンでアニメーションを管理できますし、使いやすいアセットです。  
上記フォーラムで紹介されているようなSpine用のアクションを自分で作る必要があるものの、一つの解であると言えそうです。  
同様にステートマシンを扱うPlaymakerのSpine実装も存在しているのですが、PlaymakerでMecanimのようなアニメーション遷移を作るのは難しいです。  

## まとめ

どちらもメリット・デメリットあるのでどちらを採用するかは一概に言えない感じでした。  
個人的にはSkeletonAimatonを使っていこうかと思っています。やはり公式で推奨されているなら・・・。

## 使用バージョン

Unity 2019.4.24
Spine 3.8.99