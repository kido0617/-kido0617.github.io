title: TextMeshProのSprite Assetを更新する
date: 2020-08-08
category: Unity
---

## 概要

TextMeshProはテキスト中にSpriteを絵文字のように表示する機能があります。  
TMP Settingsファイルに予め生成したSprite Assetを設定することによって使えます。  
開発途中で使用するSpriteを追加したくなり、Sprite Assetを更新したくなることはあると思います。  
しかし、このSprite Assetを更新する方法が少し見つけづらいです。

## Sprite Asset の更新

Sprite Asset生成時と同じように`Create > TextMeshPro`のメニューから`Sprite Asset`を選択すれば上書きしてファイルが生成されるので、参照を維持したままファイルの更新はできます。  
しかし、このままでは正しく読み込めていません。  
上書き生成したSprite Assetの右上の歯車メニューから`Update Sprite Asset`を選択する必要があるのです。  

![Update Sprite Assset](/img/2020-08-08-update-sprite-asset/updatespriteasset.png)


## 使用バージョン

Unity 2019.4.5  
TextMeshPro 2.0.1


## 参考

[TextMesh Pro - Update an existing Sprite Asset](
https://forum.unity.com/threads/update-an-existing-sprite-asset.540042/)
