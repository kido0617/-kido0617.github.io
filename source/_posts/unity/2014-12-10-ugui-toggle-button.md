title: uGUIでトグルなボタンを作る
date: 2014-12-10
category: Unity
---

## トグルボタン

uGUI にはtoggleとbuttonはあるけれど、両方を合わせたやつがない。
下図のようにボタンを押したら、ONになったままになるようなボタンのことだ。

![トグルボタン](/img/2014-12-10-ugui-toggle-button/toggle-button.jpg)

## uGUIのトグル

uGUIのデフォルトのトグルでこれを実現しようとすると問題がある。
下図のように、Target Graphi にOffのときの画像を、 GraphicにOnのときの画像を設定する。
Hierarchy的にはこんな感じ。


![Hierarchy](/img/2014-12-10-ugui-toggle-button/hierarchy.jpg)

![uGUIのトグル](/img/2014-12-10-ugui-toggle-button/ugui-toggle.jpg)

こうすると、トグルがOnのときにGraphicに設定した画像が表示される。しかし、Target Graphicに設定した画像は表示されたままなのである。
デフォルトのチェックボックス的なトグルの使い方だとそれが正しいのだが、今回はちょっと違う。透過処理しているので、Onの画像が表示されているときはOffの画像は消えていてほしい。

## toggleのOnValueChangedで画像の表示を変える

調べてみると、まさにこれ。[uGUI Graphical Toggle Button](http://forum.unity3d.com/threads/ugui-graphical-toggle-button.263591/)
そのページのスクリプトをちょっと直してこんな感じ。

```csharp
using UnityEngine;
using UnityEngine.UI;

[RequireComponent(typeof(Toggle))]
public class ToggleImage : MonoBehaviour {
 public Graphic offGraphic;
 
 void Start() {
   Toggle toggle = GetComponent&lt;Toggle&gt; ();
   toggle.onValueChanged.AddListener((value) =&gt; {
     OnValueChanged(value);
   });
   //初期状態を反映
   offGraphic.enabled = !toggle.isOn;
 }
 
 void OnValueChanged(bool value) {
   if (offGraphic != null) {
     offGraphic.enabled = !value;
   }
 }
}

```

こいつを Toggle にセットし、public にしてある offGraphic に off のときの画像を設定してやればOK。

![](/img/2014-12-10-ugui-toggle-button/toggle-button1.jpg)


## 確認バージョン

Unity 4.6