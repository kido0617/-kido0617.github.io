title: sprite の multiple で 境界がおかしくなる
date: 2014-06-29
category: Unity
---


## spriteの境目に線が入る

![サンプル画像](/img/2014-06-29-sprite-multiple-border/map.png)

上記画像をspriteで読み込んで32 x 32 で切り出してマップとして配置した。

![サンプル画像](/img/2014-06-29-sprite-multiple-border/bilinear.png)

そうすると、境界線に青い線が入ってしまった。しかし、32 x 32 で切り出しがミスっているわけでもなく、描画して初めて発生する。

## sprite の Filter Mode を設定

原因としては、Filter Mode というやつだ。
これがデフォルトだと Bilinear になっており、これは「テクスチャを近くでみたときにぼやける」設定らしい。
これを Point (テクスチャを近くでみたときにブロック状になる) に変更すればOK。[参考](http://docs-jp.unity3d.com/Documentation/Components/class-Texture2D.html)

![Filter Mode](/img/2014-06-29-sprite-multiple-border/filter-mode.png)

## 確認バージョン

Unity 4.5