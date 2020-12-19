title: ビルド結果のFile headersが大きい理由
date: 2018-04-04
category: Unity
---

ビルド後にファイルサイズを見ると、File headersの容量がすごく大きかった。

```
File headers  660.2 mb	 22.6% 
```

[ファイルサイズの削減](https://docs.unity3d.com/ja/current/Manual/ReducingFilesize.html)によると`Resources フォルダー内に多数の大規模アセットがある場合は、値が大きくなる可能性があります。`
とのこと。確かにResourcesフォルダは結構大きくて、40MBぐらいある。しかし、このResourcesフォルダを削除してもFile headersの容量の違いはない。

結論からいうと、`LightingData.asset`がFile headersに含まれるようだ。他のケースもあるかもしれないが、私の場合はすべてLightingDataによるものだった。
そもそもLightingDataが何十MBもあるのは、`Realtime Global Illumination`がONになっていたからであり、かなり容量食うようだった。


## 使用バージョン

Unity 5.6.4f1
