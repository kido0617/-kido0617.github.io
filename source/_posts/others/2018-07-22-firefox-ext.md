title: 自分専用のFirefoxアドオンを作る
date: 2018-07-22
category: その他
---

## 概要

[Firefox Add-ons - Mozilla](https://addons.mozilla.org/ja/firefox/)でWeb公開せず、自分だけ使えればいいアドオンを作りたくなったので作りました。
そのときの手順をメモします。

アドオンそのものについては[初めての拡張機能](https://developer.mozilla.org/ja/Add-ons/WebExtensions/Your_first_WebExtension)を参照して作ります。
デバッグ時は一時的にアドオンを有効化できますが、再起動すると使えなくなってしまうのでインストールして永続的に利用可能にする必要があります。
今回は作ったあとのパッケージ化からインストールまでを説明します。


## パッケージ化・署名

作ったあと作成したファイルをzip化します。
その際、ディレクトリごとではなく、ファイルを直接zip化する必要があります ([拡張機能をパッケージ化する](https://developer.mozilla.org/ja/Add-ons/WebExtensions/Publishing_your_WebExtension))
zip化したフォルダの拡張子を`zip`から`xpi`に単純に変更します。

アドオンは署名をする必要があります ([アドオンを署名して配布する](https://developer.mozilla.org/ja/Add-ons/Distribution))。
FirefoxのDeveloper Edition、Nightly(プレリリース版)は署名なくてもインストール可能にできるそうですが、通常版を利用しているので署名が必要です。

[https://addons.mozilla.org (AMO)](https://addons.mozilla.org/ja/developers/)で開発者登録をします ([アドオンを投稿する](https://developer.mozilla.org/ja/Add-ons/Distribution/Submitting_an_add-on))。その後は作成した.xpiファイルをアップロードすれば良いです。
その際、Webに公開しないオプションを選択しましょう。審査はないのですぐに完了します。

![Webに公開しない](/img/2018-07-22-firefox-ext/amo.png)

## インストール

署名が完了すると、署名完了後のファイルをダウンロードできるのでそれをダウンロードします。Firefoxのアドオンウィンドウを開いて、`ファイルからアドオンをインストール`からダウンロードしたファイルを選択すればインストールできます。

![ファイルからインストール](/img/2018-07-22-firefox-ext/install.png)