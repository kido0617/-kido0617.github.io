title: iTween のStop ではまる
date: 2014-09-27
category: Unity
---

## iTween のエラーで処理が止まる

Unity のアセットのiTweenは超便利ですが、使い方ミスってすごくハマった話。

現象としては、iTween.Stop() でエラーになる。
1回目の呼び出しは大丈夫なんだけど、いろいろゲームをプレイしたあと、iTween.Stop()をするとエラーになるというもの。

MissingReferenceException: The object of type 'GameObject' has been destroyed but you are still trying to access it.
Your script should either check if it is null or you should not destroy the object.

というわけで、参照がなくなっていると出る。

## 原因と対策


原因は、iTween.MoveTo 実行中に、そのGameObjectを削除したためだった。
極端な例↓

```csharp
iTween.MoveTo(gameObject, new Vector2(10f, 10f), 5f);
Destroy (gameObject);
```

こうすると、iTween内で使用しているリストiTween.tweensのGameObjectが残ったままになるっぽい。
事実、 iTween.Count() すると、いつまで経っても カウントが0にならなかった。

一度、こうなるといつまで経っても残ったままになってしまう。しかもシーンをまたいでもそのままになってしまうので、かなり痛い。
iTween.tweens.Clear() をすればクリアすることができるのでこれを使うことにした。

## 確認バージョン

Unity 4.5