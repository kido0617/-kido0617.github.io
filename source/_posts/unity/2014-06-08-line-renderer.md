title: 2D画面に線を引く Line Renderer
date: 2014-06-08
category: Unity
---
Unity2D で 線を引きたかったので、Line Renderer を使ってみることにした。
「Add Component」 → 「Effects」→ 「Line Renderer」で追加できる。

Positions で 始点と終点の座標を指定し、Parameters で 色や太さを指定できる。
Unity4.5を使っているが、2DでEffectsを使うには Sorting Layer と Order In Layer をスクリプトから指定しないといけない。
例えば、以下のように指定する。

``` csharp
LineRenderer line = GetComponent<LineRenderer>();
line.renderer.sortingLayerName = "Effect";
line.renderer.sortingOrder = 1;
```

そして、Line Renderer の Materials を指定しなければいけない。
例えば、インスペクタビューからLine Rendererの Materials に Sprites-Defaultを指定する。
これで色もちゃんと反映されるし、描画もちゃんとされる。

## 確認バージョン

Unity 4.5