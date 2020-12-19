title: Easy Save2 で シリアライズされたクラスを保存する
date: 2015-01-12
category: Unity
---

前回、[Easy Save2 を使ってみる](/unity/2014-11-15-easy-save2/) でEasy Save2 を簡単に使ってみた。
クラス内の保存するパラメータが少ないうちは、1つずつセーブしたりロードしたりしてもいいのだが、これが大量になるといちいち記述するのも面倒になる。
[Saving and Loading Custom Scripts](http://www.moodkie.com/forum/viewtopic.php?f=4&t=4)を見てもらうとわかるのだが、SaveとLoadで該当するパラメータを全部記載しないといけないので、なかなか骨が折れる。
できることなら、クラス内のパラメータをまとめて保存したい。というわけで、今回はクラスをシリアライズして保存してみる。

以下のようなクラスをサンプルとする。

```csharp
public class Player {

  public int hp;
  public string name;

}

```

## BinaryFormatterでバイナリにシリアライズして保存する

BinaryFormatterはクラスをバイナリにシリアライズするものである。使う際には[System.Serializable]の記述が必要なので、以下のように修正。

```csharp
[System.Serializable]
public class Player {
```

BinaryFormatterはstreamを引数に取る必要があるので、MemoryStreamを指定する。これでシリアライズされたデータをbyte配列で取得できる。あとは、このbyte配列をEasy Save2に渡して保存すれば良い。ロードはその逆。以下にソースを示す。

```csharp
Player player = new Player();
player.hp = 100;
player.name = "あいうえお";

//セーブ.
BinaryFormatter bf = new BinaryFormatter();
MemoryStream saveMem = new MemoryStream();
bf.Serialize(saveMem, player);
ES2.Save(saveMem.ToArray(), "player");   //byte配列で保存.
saveMem.Close();


//ロード.
bf = new BinaryFormatter();
MemoryStream loadMem = new MemoryStream(ES2.LoadArray<byte>("player"));
Player loadPlayer = (Player)bf.Deserialize(loadMem);
loadMem.Close();

print(loadPlayer.name);   //あいうえお
print(loadPlayer.hp);     //100
```


これで動くことは動くのだが、非常に残念なことに、BinaryFormatterはiOSだと動かないらしい。
仕方ないのでJSONでも保存してみる。

## ListJSONでJSONにシリアライズして保存する

クラスをJSONにシリアライズするのに[LitJSON](https://github.com/LitJSON/litjson)を使う。
準備として、上記ページからLitJSONのdllをダウンロードし、UnityのProjectのPluguinsフォルダに突っ込む。
JSONにシリアライズしたら、stringとして保存すれば良い。ソースを以下に示す。

```csharp
Player player = new Player();
player.hp = 100;
player.name = "あいうえお";

//セーブ.
string saveJson = LitJson.JsonMapper.ToJson(player);
ES2.Save(saveJson, "player");

//ロード.
string loadJson = ES2.Load<string>("player");
Player loadPlayer = LitJson.JsonMapper.ToObject<Player>(loadJson);

print(loadPlayer.name);   //あいうえお
print(loadPlayer.hp);     //100
```


## 確認バージョン

Unity 4.6