title: デバッグ用にクラスのプロパティをわかりやすく列挙する
date: 2015-09-17
category: その他
---

## 要件

ゲームのデバッグでユーザのステータスなどを列挙して、表示したいケースが多々ある。
そのとき、ユーザクラスにメンバ変数やプロパティを追加した場合、デバッグにも表示用に同じように追加しないといけなく、メンテナンスが面倒くさい。
そこでユーザクラス側に追加しただけで、デバッグ画面にも反映されるようにすることを考える。

以下の様なUserクラスを考える。このクラスの持つ3つのプロパティを列挙したい。リフレクションを使えば列挙は可能だが、順番や表示のわかりやすさを工夫したい。
例えば、"Name"、"Hp"、"Strength"などと変数名が表示されると少々わかりづらいので（作った本人ならいいが）、"名前"、"体力"、"力"などと表示する。また、表示順番もこちらで指定できるようにする。

```csharp
class User {
  public string Name { get; set; }
  public int Hp { get; set; }
  public int Strength { get; set; }  
}
```


## Attributeをつける

プロパティにAttributeをつけて管理する。例えば以下のようにする。

```csharp

//順番管理用のAttribute定義
[AttributeUsage(AttributeTargets.Property, Inherited = false, AllowMultiple = false)]
public sealed class DebugOrderAttribute : Attribute {
  private readonly int _order;
  public DebugOrderAttribute(int order = 0) {
    _order = order;
  }

  public int DebugOrder { get { return _order; } }
}

//名前指定用のAttribute定義
[AttributeUsage(AttributeTargets.Property, Inherited = false, AllowMultiple = false)]
public sealed class DebugNameAttribute : Attribute {
  private readonly string _name;
  public DebugNameAttribute(string name = "") {
    _name = name;
  }

  public string DebugName { get { return _name; } }
}

//定義したAttributeをつける
class User {
  [DebugOrder(1), DebugName("名前")]
  public string Name { get; set; }

  [DebugOrder(2), DebugName("体力")]
  public int Hp { get; set; }

  [DebugOrder(3), DebugName("力")]
  public int Strength { get; set; }
}

```


## 順番用のAttributeを使ってソートしつつ、プロパティを列挙する
```csharp

//サンプル・データ
User user = new User() { Name = "テスト", Hp = 100, Strength = 30 };

//DebugOrder　Attributeでソートしつつプロパティを取得
var properties = from property in typeof(User).GetProperties()
                 let orderAttribute = property.GetCustomAttributes(typeof(DebugOrderAttribute), false).SingleOrDefault() as DebugOrderAttribute
                 orderby orderAttribute.DebugOrder
                 select property;

//プロパティを列挙する
foreach (var property in properties) {
  DebugNameAttribute dName = property.GetCustomAttributes(typeof(DebugNameAttribute), false).SingleOrDefault() as DebugNameAttribute;
  Console.WriteLine(dName.DebugName + ":" + property.GetValue(user, null).ToString());   //表示
}

```

結果
```
名前:テスト
体力:100
力:30
```