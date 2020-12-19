title: uGUIのButtonをクリック時にハイライトのままになる
date: 2014-12-27
category: Unity
---

しょうもないことだけど、ちょっとハマったので。

uGUIのButtonはクリックするとHighlighted Colorで設定した色（マウスオーバーしたときの色）のままになってしまう。
これはどうやらキーボードで操作したときのナビゲーションのためのようだ。

[Unity 4.6 UI button highlight color staying after button clicked](http://answers.unity3d.com/questions/854724/unity-46-ui-button-highlight-color-staying-after-b.html)

上記にあるように、ButtonコンポーネントのNavigationがデフォルトだとAutomaticになっているので、これをNoneにすれば良い。
キーボードで操作できなくなるけど、マウス操作主体のゲームならこれでOK。

## 確認バージョン

Unity 4.6