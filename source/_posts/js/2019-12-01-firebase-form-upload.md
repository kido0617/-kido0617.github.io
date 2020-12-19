title: Firebaseのstorageにformの画像をアップロードする
date: 2019-12-01
category: JavaScript
---

## 概要

`type='file'`指定したinputから画像を選択し、formがsubmitされたときにFirebaseのstorageにその画像をアップロードします。  
その際、複数画像のアップロードにも対応します。

## storageのルール

ルールは以下のようにします。  
バケットの`/form-uploaded` 配下にのみアップロードを許可し、MAX20MBの画像ファイルを許可する設定です。

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /form-uploaded/{id} {
      allow write : if request.resource.size < 20 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
    }
  }
}

```

## htmlとjs

htmlとjsは以下です。  

```html
<html>
<head></head>
<body>
  <form>
    <input type='file' accept='image/*' multiple='multiple' name='imgs[]'>
    <button type='submit'>送信</button>
  </form>

  <script src='https://www.gstatic.com/firebasejs/7.5.0/firebase-app.js'></script>
  <script src='https://www.gstatic.com/firebasejs/7.5.0/firebase-storage.js'></script>
  <script>

    //firebase初期化
    var firebaseConfig = {
      apiKey: 'xxxxx',
      projectId: 'yyyyy',
      storageBucket: 'zzzzzz',
    }
    firebase.initializeApp(firebaseConfig);

    //formのsubmitにイベント設定
    var form = document.querySelector('form');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var imgs = form.querySelector('input');
      var uploads = [];
      for (var file of imgs.files) {
          //選択したファイルのファイル名を使うが、場合によってはかぶるので注意
        var storageRef = firebase.storage().ref('form-uploaded/' + file.name);
        uploads.push(storageRef.put(file));
      }
      //すべての画像のアップロード完了を待つ
      Promise.all(uploads).then(function () {
        console.log('アップロード完了');
      });
    });
  </script>

</body>
</html>

```