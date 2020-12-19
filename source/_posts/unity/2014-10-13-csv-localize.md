title: csv読み込んで ローカライズ
date: 2014-10-13
category: Unity
---

## はじめに

今まで作ってきたゲームは文がなく、ScoreとかContinueぐらいの一般的な単語しかなかったので、特にローカライズなんてことは考えてなかった。
だが今後のことを考えて、今回整理することにした。
画像などのバイナリデータもローカライズの対象になるのだけど、今回はテキストを切り分けることができれば良い。

このスライドが参考になります。
[20140530 Unity に於ける Localization のおはなし](http://www.slideshare.net/monry84/20140530-unity-localization)

ちなみにGoogleのスプレッドシートと連携してローカライズするアセットがある。
[Localization package](https://www.assetstore.unity3d.com/jp/#!/content/984)
[GoogleFu](https://www.assetstore.unity3d.com/jp/#!/content/11818)

## CSVの読み込み

シンプルにCSV読み込んでやりたい。
まず、csvを Resourcesフォルダを作って中に格納する。Resourcesフォルダに入れると Resources.Load(“ファイル名”) でアクセスすることができる。
[テキスト アセット / Text Asset](http://docs-jp.unity3d.com/Documentation/Components/class-TextAsset.html)

csvの中身はこんな感じ。 key, 日本語, 英語  という列。
[text]
lang,日本語,English
greeting,こんにちわ,Hello
explain,これは寿司です,This is sushi
[/text]

## CSVのパース

CSVのパースは、下記のページに正規表現を使った方法が記載されているので、それを参考にすればOK。
読み込んだCSVデータは、keyを元にDictonaryに突っ込めば良い。
[CSV形式のファイルをDataTableや配列等として取得する](http://dobon.net/vb/dotnet/file/readcsvfile.html)

## 言語設定による分岐


ユーザの言語設定は、[Application.systemLanguage](http://docs-jp.unity3d.com/Documentation/ScriptReference/Application-systemLanguage.html)で取得できる。

```csharp
if(Application.systemLanguage == SystemLanguage.Japanese) {
 lang = "ja";
} else {
 lang = "en";
}
```

以上を組み合わせてLocalizeManager的なのをシングルトンで作って、テキストが必要になったらkey指定して取得する感じ。


## 確認バージョン

Unity 4.6