title: ビジュアルノベルアセットFungusにコマンドを追加してカスタマイズする
date: 2018-08-02
category: Unity
---

この記事は[Unity アセット真夏のアドベントカレンダー 2018 Summer!](http://assetstore.info/eventandcontest/adventcalendar/asset-adventcalendar2018summer/)の2日目の記事です。

## Fungusについて

[Fungus](https://www.assetstore.unity3d.com/jp/#!/content/34184) はフリーのビジュアルノベルアセットで、高機能・高評価のアセットです。
簡単な概要については[フリーのビジュアルノベルアセットのFungusが便利](/unity/2017-08-22-fungus/)で紹介しています。  
また、応用として、[フリーのビジュアルノベルアセットFungusを使ってRPGのイベントを作る ](/unity/2017-12-13-fungus-rpg/)でも紹介しています。

## 概要

Fungusはビジュアルノベルアセットですが、RPGの会話機能に使ったり、フローチャートの機能を使ってイベントを制御したりすることができます。

![Fungusのフローチャート](/img/2017-08-22-fungus/flowchart.png)

Fungusのコマンドは以下のようにたくさん用意されていますが、独自のコマンドを追加することにより、プロジェクトに適した使い方ができます。

![Fungusのコマンド群](/img/2018-08-02-custom-fungus/commands.png)

## コマンドの追加方法

コマンドのソースは`Fungus/Scripts/Commands`に配置されています。
例えば、音楽を再生するPlay Musicコマンドを抜粋すると以下のようになっています。  

```csharp
[CommandInfo("Audio",
              "Play Music",
              "Plays looping game music. If any game music is already playing, it is stopped. Game music will continue playing across scene loads.")]
[AddComponentMenu("")]
public class PlayMusic : Command
{
    [SerializeField] protected AudioClip musicClip;
    [SerializeField] protected float atTime;
    [SerializeField] protected bool loop = true;
    [SerializeField] protected float fadeDuration = 1f;

    public override void OnEnter(){
        var musicManager = FungusManager.Instance.MusicManager;
        float startTime = Mathf.Max(0, atTime);
        musicManager.PlayMusic(musicClip, loop, fadeDuration, startTime);
        Continue();
    }
    public override string GetSummary(){
      if (musicClip == null){
        return "Error: No music clip selected";
      }
      return musicClip.name;
    }
```

このソースからわかるように`Command`クラスを継承したクラスを作成し、`CommandInfo`を追加することによって、コマンドとして認識されるようです。  
`CommandInfo`の第一引数がカテゴリ、第二引数が表示名、第三引数がヘルプのテキストです。  
クラスのメンバに`SerializeField`を追加した変数はInspectorから設定できるようになります。

`OnEnter`メソッドが実際にコマンドとして実行されるメソッドです。最後に`Continue()`を呼ぶことにより、次のコマンドに遷移します。 

`GetSummary`メソッドを実装するとコマンドリストに表示されるサマリを変更できます。Play Musicに関してはAudio Clipがあればその音楽ファイル名を表示しています。

もし、プロジェクトで独自のSoundManagerクラスなどを実装している場合、この`Play Music`や`Play SE`を参考に作り直すと良いです。
ちなみにFungusはデフォルトだと音楽再生などをするとFungusManagerというDontDestroyOnloadされたマネージャが生成されます。

![Play Musicコマンド](/img/2018-08-02-custom-fungus/play-music.png)

## if コマンドを追加する

コマンドの中でもifは特殊なコマンドです。  
ここでは仮に`DEBUG_HOGE`がdefineされていたらifが成立するようなデバッグ用のif コマンドを作ってみます。
`Command`クラスではなく`Condition`を継承し、`bool EvaluateCondition()`と `bool HasNeededProperties()`を実装すればif コマンドが作れます。
できたのが以下です。`EvaluateCondition()`の返り値が`true`だとif内に入ります。
`HasNeededProperties()`についてはこれが`false`を返すと条件に関係なくifの中に入ってしまうので、ここでは常に`true`を返しておきます。

```csharp
namespace Fungus {
  /// <summary>
  /// If the test expression is true, execute the following command block.
  /// </summary>
  [CommandInfo("Flow", "DebugIf", "If define DEBUG_HOGE")]
  [AddComponentMenu("")]
  public class DebugIf : Condition {

    protected override bool EvaluateCondition() {
#if DEBUG_HOGE
      return true;
#else
      return false;
#endif
    }
    protected override bool HasNeededProperties() {
      return true;
    }
  }
}

```

![DEBUGIfコマンド](/img/2018-08-02-custom-fungus/debugif.png)


## まとめ

Fungusはオープンソースでもあるのでソースコードが見やすく、他の人が拡張しやすいように設計されています。
そのため、今回のようにコマンドを追加したりして、自身のプロジェクトに合うようにカスタマイズするととても便利になります。
ただ、あまり本体のコードを書き換えるとバージョンアップに対応できないので注意が必要です。
私は2017年9月からVer.3.6を使用していますが、今回の検証のためVer.3.9.1をダウンロードしたところ、コマンドが増えていたりとバージョンアップは頻繁に行われているようです。


## 使用したバージョン

* Unity 2018.2.0f2
* Fungus 3.9.1








