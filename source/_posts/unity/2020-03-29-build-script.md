title: ビルドスクリプトを書く
date: 2020-03-29
category: Unity
---

## 概要

テスト時のビルドとリリース時のビルドで設定が違い、ビルド時に毎回指定するのも面倒なのでスクリプトを書きます。
基本的に以下のページに沿って実装しています。
[BuildPipeline.BuildPlayer](https://docs.unity3d.com/ja/current/ScriptReference/BuildPipeline.BuildPlayer.html)


## コード

Editorスクリプトなので、Editorフォルダ配下に置きます。

```csharp
 public class BuildScript {

    [MenuItem("MyBuild/Test Build")]
    public static void TestBuild() {
      Build(false);
      Debug.Log("テストビルド Done");
    }

    [MenuItem("MyBuild//Release Build")]
    public static void ReleaseBuild() {
      Build(true);
      Debug.Log("リリースビルド Done");
    }

    static void Build(bool isReleaseBuild) {
      var scenes = GetScenes(isReleaseBuild);

      BuildPlayerOptions buildPlayerOptions = new BuildPlayerOptions();
      buildPlayerOptions.scenes = scenes;
      if (isReleaseBuild) buildPlayerOptions.locationPathName = "Build/Release/game.exe";
      else {
        buildPlayerOptions.locationPathName = "Build/Test/game.exe";
        //テスト時はDevelopmentビルドのオプションを有効にする
        buildPlayerOptions.options = BuildOptions.Development;
      }

      //win64 Standalone向けを指定
      buildPlayerOptions.target = BuildTarget.StandaloneWindows64;

      BuildReport report = BuildPipeline.BuildPlayer(buildPlayerOptions);
      BuildSummary summary = report.summary;

      if (summary.result == BuildResult.Succeeded) {
        Debug.Log("Build succeeded: " + summary.totalSize + " bytes");
      } else if (summary.result == BuildResult.Failed) {
        Debug.LogError("Build failed");
      }

    }

    //DebugXXXXというシーンがいくつかあり、テストビルド時のみ有効にしたい
    //リリースビルド時はそれらのシーンを除外している
    static string[] GetScenes(bool isReleaseBuild) {
      List<string> sceneList = new List<string>();
      EditorBuildSettingsScene[] scenes = EditorBuildSettings.scenes;
      foreach (EditorBuildSettingsScene scene in scenes) {
        if (isReleaseBuild && scene.path.IndexOf("Debug") != -1) continue;
        sceneList.Add(scene.path);
        Debug.Log(scene.path);
      }
      return sceneList.ToArray();
    }

  }

```

## ビルドプション

以下のようにDevelopmentのオプションを指定していますが、これはenum値のflagです。  
`buildPlayerOptions.options = BuildOptions.Development`

以下にenum値が定義されているので、複数指定するときはORでflag指定すれば良いです。
[BuildOptions](https://docs.unity3d.com/ja/current/ScriptReference/BuildOptions.html)

` buildPlayerOptions.options = BuildOptions.Development | BuildOptions.AllowDebugging;`


## ビルドサマリー

ビルド後に[BuildSummary](https://docs.unity3d.com/ja/current/ScriptReference/Build.Reporting.BuildSummary.html)が出力されますが、ここではEditor Logで見られるような各アセットの容量などは確認できません。

それらを確認するのに`Package Manager`からインストールできる[Build Report Inspector](https://docs.unity3d.com/Packages/com.unity.build-report-inspector@0.1/manual/index.html)が便利そうです(2020年3月時点でまだプレビュー)。
`Library/LastBuild.buildreport`に最後にビルドしたレポートが保存されるらしく、それを解析しているようです。


## 確認バージョン

Unity 2018.4.17f1