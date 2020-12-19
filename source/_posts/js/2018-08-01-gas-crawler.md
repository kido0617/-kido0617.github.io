title: Google Apps Script でクローラーを作る
date: 2018-08-01
category: JavaScript
---

自分のサイトの情報を抽出したくてクローラーを作ろうとしました。  

最初に言っておきたいのですが、GASには一日の実行可能時間に制限があるため、1日中クローラーを動かすようなことはできません。
「サービスで 1 日に使用しているコンピュータ時間が長すぎます」とエラーメールが来ます。
時間については以下のトリガーの合計実行時間を参照してください。
[QUOTA LIMITS](https://script.google.com/dashboard)

## 処理の流れ

基本的にやることはhtmlをフェッチしてきて、正規表現で取得したい情報を抽出するだけです。
GASで使えそうなhtmlパーサーなどは見つかりませんでした。
なので基本的な形は以下のようになります。

```js
function myFunction() {  
  //エラーコードを取るためには muteHttpExceptions を trueにする必要がある。これがないとそのまま落ちる
  var response = UrlFetchApp.fetch('http://kido0617.github.io/', {"muteHttpExceptions": true});
  if(response.getResponseCode() >= 400){
    Logger.log(response.getResponseCode());
    return;
  }

  // htmlが取れるのであとは正規表現使って抽出していくだけ
  var html = response.getContentText('UTF-8'); 

  //抽出できたら、スプレッドシートに追加していく

  //アクティブなシートを取得。あるいはシート名で取得可能 spreadsheet.getSheetByName("シート1");
  var sheet = SpreadsheetApp.getActiveSheet();
  //appendRowすると最後の行に追加できる
  sheet.appendRow(['抽出結果A', '抽出結果B'])
}
```

また、GASは1回の実行時間が6分間で制限されていますが、これはトリガーを使うことで解決できます。
[Google Apps Script で6分以上の処理をする](/js/2017-02-13-gas-6-minutes)を参照してください。

クロールする際、サイトに負荷かけないように処理をスリープするのは以下で可能です。

```js
Utilities.sleep(60000);  //ミリ秒
```