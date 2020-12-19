title: 背景をスクロールさせる
date: 2014-06-02
category: Unity
---

## 背景のスクロール

2Dゲームの背景の画像をスクロールさせて動いている感を出したい。スクロールはループして、常にぐるぐると動かしたい。

[Turtorial - 2D Shooting Game 第06回　背景を作る](http://japan.unity3d.com/developer/document/tutorial/2d-shooting-game/game/06.html)

このチュートリアルが参考になる。しかし、「MaterialsフォルダにあるBackground-FrontをQuadにドラッグ＆ドロップします」とあるのだが、
Background-Frontというマテリアルの作り方に関しては記載がない。というわけで、そのMaterialを自分で作る。

## テクスチャの用意

まず、スクロールする画像をUnityのProjectにドラッグアンドドロップして読み込む。このとき、Texture Type が Sprite になっているので、これをTextureにする。そして、Wrap Mode を Repeat にすればOK。下記画像を参照。

![Texture設定](/img/2014-06-02-scroll-background/sprite-texture.png)

ただし、このときプラットフォームをAndroidやiOSにしていると、「Graphics device doesn't support Repeat wrap mode on NPOT textures.」と表示される。画像がNPOT（２の累乗のサイズ）じゃないので、Repeatにできないらしい。
仕方ないので、画像を 512 x 32 とか 256 x 128 とか、2の累乗のサイズにする。

## マテリアルの作成

次に、Project の Create から Material を選択し、Material を作る。このMaterialに上記で作成したTextureを貼る。
そして、Material の Shader を 「Unlit / Transparent」 にすればOK。
あとは、例のチュートリアル通りでできた。

## 確認バージョン

Unity 4.5