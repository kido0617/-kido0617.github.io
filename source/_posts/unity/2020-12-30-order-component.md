title: コンポーネントの順番をスクリプトから並び替える
date: 2020-12-30
category: Unity
---

## UnityEditorInternal.ComponentUtility

インスペクタに表示されているコンポーネントの順番はドラッグしたり、右クリックメニューからMove Up や Move Downを選択すると動かすことができます。  
この動作を以下のエディタスクリプトから実行することができます。

* UnityEditorInternal.ComponentUtility.MoveComponentUp(component);
* UnityEditorInternal.ComponentUtility.MoveComponentDown(component);

Move Up と Downしかないので少し自由に動かしづらいです。  
私はこれらを使ってインスペクタに表示されるコンポーネントをソートするということをしています。  

コンポーネントの順番は見やすさもありますが、GetComponentsで取得したときの返り値にも影響します。  
GetComponentsで取得したときのコンポーネントの順番はインスペクタの順番であることが保証されているからです。  
[このページ](https://docs.unity3d.com/Manual/UsingTheInspector.html?_ga=2.84041243.325931642.1609116201-486307593.1604365260)に以下のように記載があります。  
```
The order you give to components in the Inspector window is 
the order you need to use when querying components in your user scripts. 
If you query the components programmatically, you’ll get the order you see in the Inspector.
```
 




## 使用バージョン

Unity 2019.4.14

