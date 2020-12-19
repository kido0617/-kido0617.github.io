title: LoadLevelAdditive で共通シーンを加算
date: 2014-10-12
category: Unity
---

## シーンの加算

前々から、各シーンで共通のオブジェクトを読み込みたいと思っていた。

[「もののけ大戦“陣”」製作事例](http://www.slideshare.net/RyoheiTokimura/ss-14048278)
を読んでいたら、25ページから、そのことについて触れてあった。
どうやら、共通のシーンを用意して表示中のシーンに加算することで実現するらしい。

シーンを加算するためのメソッドが Application.LoadLevelAdditive("SceneName") である。

## Application.LoadLevelAdditive を試す

適当にシーンを作って、そこからCommonという名前のシーンを読み込む。
```csharp
void Awake(){
   Application.LoadLevelAdditive("Common");
}
```

以下の様に起動したシーンに共通シーンが加算されていることがわかる。このとき、共通シーンの中身がそのまま加算されるので、
散らからないように適当なGameObjectにまとめておいたほうが良さそう（図でいうと、CommonSceneオブジェクトにAとBのオブジェクトをまとめているように）。

![共通シーンを読み込んだ結果](/img/2014-10-12-load-level-addtive/common_scene.png)

## 確認バージョン

Unity 4.5