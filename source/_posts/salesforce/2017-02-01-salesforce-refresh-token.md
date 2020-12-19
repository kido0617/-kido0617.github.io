title: SalesforceのOAuth2でリフレッシュトークンが取得できない
date: 2017-02-01
category: Salesforce
---

最近、仕事でSalesforceを触っている。
REST APIを使っていろいろしようとしたのだが、OAuth2のトークンを交換するところで、なぜかRefresh Tokenが空で取得できなくてはまった。
Access Tokenは取得できるのに、Refresh Tokenが空。

答えはここで判明。
[oauth authorization no longer returning refresh token (HELP!)](https://developer.salesforce.com/forums/?id=906F00000008pFZIAY)

Salesforce側の接続アプリケーションの設定でスコープを定義するところがあるのだが、
そこに「ユーザに代わっていつでも要求を実行(refresh_token,offline_access)」というスコープがあり、これが必要なようだ。
フルアクセスのスコープを入れてたのでこれで全て入っているとばかり思っていたが、そうではないらしい。

![scope](/img/2017-02-01-salesforce-refresh-token/refreshtoken.png)

これで無事Refresh Tokenが取れた。