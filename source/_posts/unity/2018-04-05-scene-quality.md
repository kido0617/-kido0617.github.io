title: シーンビューにクオリティ設定のスライダーを出すエディタ拡張
date: 2018-04-05
category: Unity
---

`Edit` -> `Project Settings` -> `Quality` を選択すると`QualitySettings`が開き、クオリティを設定できます。
ただテストするときに毎回これを選択するのは面倒なのでシーンビューにクオリティを変更できるスライダーを表示したいと思います。
図のような感じです。

![QualitySettingsスライダー](/img/2018-04-05-scene-quality/qualitysetting.png)

ソースは以下。

```csharp
using UnityEditor;
using UnityEngine;

public class EditorQualitySettings {

  static int quality = 0;
  static int tmpQuality = 0;

  [InitializeOnLoadMethod]
  static void AddGUI() {
    SceneView.onSceneGUIDelegate += OnGUI;
    quality = tmpQuality = QualitySettings.GetQualityLevel();
  }

  static void OnGUI(SceneView sceneView) {
    GUI.WindowFunction func = id => {
      quality = EditorGUILayout.IntSlider(quality, 0, QualitySettings.names.Length - 1, GUILayout.Width(200));
      if (tmpQuality != quality) {
        QualitySettings.SetQualityLevel(quality);
        tmpQuality = quality;
      }
    };
    GUILayout.Window(1, new Rect(0, 15, 200, 40), func, "Quality");
  }
}

```

## 使用バージョン

Unity 5.6.4f1
