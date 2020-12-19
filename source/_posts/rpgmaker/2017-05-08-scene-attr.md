title: シーンに引数を渡す
date: 2017-05-08
category: RPGツクールMV
---

シーンを切り替える際、SceneManager.goto とか SceneManager.push を使うが、このとき引数を次のシーンに渡すことができる。それがprepareNextSceneだ。
例えば、Scene_Testに遷移するとき、以下のような感じで渡せる。

```javascript
SceneManager.push(Scene_Test);
SceneManager.prepareNextScene(123, "abc");
```

遷移先のシーンでは、以下のprepareメソッドで受け取れる。

```javascript
Scene_Test.prototype.prepare = function(a, b) {
  console.log(a, b);   //123, "abc"
};
```

