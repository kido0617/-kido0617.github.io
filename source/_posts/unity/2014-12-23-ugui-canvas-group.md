title: uGUIのCanvas Groupを使って透過処理をしたり、操作を制限する
date: 2014-12-23
category: Unity
---

## Canvas全体の透過処理

uGUIを使って適当なダイアログを作っていたのだが、これをフェードインしながら表示させたくなった。

CanvasやuGUIのGameObject配下全体の透過を一度に設定するためには、[Canvas Group](http://docs.unity3d.com/Manual/class-CanvasGroup.html)コンポーネントを追加する必要がある。
Add Component -> Layout -> Canvas Group  で追加できる。
Alpha をいじることができるので、これをスクリプトから値変えればフェードイン・アウトもできそうだ。

## Canvas内のユーザの処理を制限する

ちなみに、Canvas Group には Interactable フラグがある。これをfalseにするとそのCanvas Group配下のボタンなどをユーザからの操作を受け付けなくすることができる。

## 確認バージョン

Unity 4.6