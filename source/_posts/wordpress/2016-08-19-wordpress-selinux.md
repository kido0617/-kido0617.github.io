title: 更新時にFTP情報の入力を促されるのを改善
date: 2016-08-19
category: WordPress
---

## WordPress更新時にFTP情報の入力が必要と表示される

WordPressの更新通知が来ていたので更新しようとしたところ、以下のような文言の画面が表示されてしまった。  
「要求されたアクションを実行するには、WordPress が Web サーバーにアクセスする必要があります。 次に進むには FTP の接続情報を入力してください。 接続情報が思い出せない場合は、ホスティング担当者に問い合わせてください。」  
どうやら、パーミッションや所有者の問題で更新できないようである。

## 所有者の見直し

サーバはnginxなので、phpの実行時ユーザはnginxになる。そのため、WordPressディレクトリの所有者をnginxに。
パーミッションも問題なし。これで大丈夫のはずだが、なぜか直らず。

## 問題はSELinuxだった

正直、1時間以上はまった。どうみても所有者もパーミッションも大丈夫なのに更新できない。
ふと、phpでmkdirとかできるのだろうかと思い、実行したところ Permission Denied。なんかおかしい。
そして、やっと原因がわかった。問題はSELinuxだったのだ。以下の記事が答え。
[PHPでPermission deniedが出てしまう（CentOS7）](http://itinfo.d-easy.jp/server/post-215)

chcon -R -t httpd_sys_content_rw_t wp  
WordPressのフォルダに対して、以上のように実行して、解決した。