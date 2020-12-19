title: 画面全体に色をかける
date: 2014-10-05
category: Unity
---

画面全体に色をかけたいことがある。薄暗くしたり、ほのかに白くしたいときなど。
そういうときは、Texture2Dを使うと簡単だった。

```csharp
 Texture2D screenTexture;

 public void Awake ()
 {
   // 1pixel のTexture2D.
   screenTexture = new Texture2D (1, 1, TextureFormat.ARGB32, false);
   // 黒のアルファ0.5で薄暗い感じにする.
   screenTexture.SetPixel(0, 0, new Color(0, 0, 0, 0.5f));
   // これをしないと色が適用されない.
   screenTexture.Apply();
 }
 
 public void OnGUI ()
 {
   // カメラのサイズで画面全体に描画.
   GUI.DrawTexture (Camera.main.pixelRect, screenTexture);
 }
```

時間で計算して徐々に色を変えると、フェードの効果もできる。


## 確認バージョン

Unity 4.5