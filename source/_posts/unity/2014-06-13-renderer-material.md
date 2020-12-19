title: Renderer の Materials を スクリプトから設定する
date: 2014-06-08
category: Unity
---

MeshRenderer などの Materials をスクリプトから動的に設定する。
普通にこうやればできるかなと思ったが、できず。

``` csharp
renderer.materials[0] = someMaterial1;
renderer.materials[1] = someMaterial2;
```


正解は以下。一度配列で取得して、配列としてセットし直すと動く。
``` csharp
Material[] mats = renderer.materials;
mats[0] = someMaterial1;
mats[1] = someMaterial2;
renderer.materials = mats;
```

## 確認バージョン

Unity 4.5