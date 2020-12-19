title: Move To View を改良する
date: 2017-12-08
category: Unity
---

## Move To View について

シーンで表示している位置にオブジェクトを動かす機能で`Move To View`があります。メニューの`GameObject-> Move To View (Ctrl + Alt + F)`です。
たしかにこれを使うとそれっぽい位置にオブジェクトが移動するのですが、だいたい自分の想像していた位置にはいきません。

![シーン](/img/2017-12-08-move-to-view/scene.png)

例えば、上記の画像のシーンビューで適当なオブジェクトを選択し、`Move To View`をしたとすると、下記のような位置に移動します。
床をすり抜けて、どこか遠くに置かれ、結局自分で位置を調整することになります。

![Move To View後](/img/2017-12-08-move-to-view/move-to-view.png)

私の求めているものは、シーンビューのカメラからレイを飛ばして、最初に当たった位置あたりにオブジェクトが移動する`Move To View`です。
というわけでそれを作ります。

## エディタ拡張で実装

適当な`Editor`フォルダを作り、`MyMoveToView.cs`を作り、以下のコードを実装します。
これで`GameObject-> My Move To View (Ctrl + Alt + Z)` が使えます。

```csharp
using UnityEditor;
using UnityEngine;

public class MyMoveToView {

  [MenuItem("GameObject/My Move To View %&z")]
  static void Do() {
    if (Selection.activeGameObject == null) { return; }

    var c = SceneView.lastActiveSceneView.camera;
    Ray ray = new Ray(c.transform.position, c.transform.forward);
    RaycastHit hit;
    if (Physics.Raycast(ray, out hit)) {
      Selection.activeGameObject.transform.position = hit.point;
    } else {
      Selection.activeGameObject.transform.position = c.transform.position;
    }
  }

}

```

実行すると、想定した位置に移動できました。

![Move To View後](/img/2017-12-08-move-to-view/my-move-to-view.png)


## 確認バージョン

Unity 5.6.4f1