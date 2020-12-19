title: Skinned Mesh Renderer の Boundsについて
date: 2018-08-01
category: Unity
---

カメラの端にいくと、SkinnedMeshRendererのオブジェクトの描画がされないということがあった。
以下の動画のような感じ。

<video src="/img/2018-08-01-skinnedmesh-bounds/camera.mp4" width="600"  controls></video>

これはどういうことかというと、SkinneMeshRendererのBoundsが正しく設定されていないためだった。
このオブジェクトのBoundsは以下のようになっている。白い線で描画されているボックスがBoundsである。

![Bounds](/img/2018-08-01-skinnedmesh-bounds/bounds.png)

SkinneMeshRendererはBoundsがカメラに入っていない場合、パフォーマンスのため描画しない。
そのため、メッシュとBoundsのサイズに違いがあると動画のような現象が起こる。

詳しくは以下の「オフスクリーン時の更新」に書かれている。

[スキンメッシュレンダラー](https://docs.unity3d.com/jp/current/Manual/class-SkinnedMeshRenderer.html)

