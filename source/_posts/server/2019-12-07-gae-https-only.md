title: GAEでhttpのアクセスをhttpsにリダイレクトする
date: 2019-12-07
category: GCP
---

GAEはデフォルトだとhttpでもhttpsでもアクセスできてしまいます。  
httpのアクセスをhttpsにリダイレクトするには`app.yaml`で記述します。  
handlersのurlに対して、`secure: always`と`redirect_http_response_code: 301`を記述します。

Laravelで使用しているapp.yamlの例。  
リダイレクトは最後に記述しなければならないし、staticのものにも`secure: always`が必要です。  

```yaml
handlers:
- url: /favicon\.ico
  static_files: public/favicon.ico
  upload: public/favicon.ico
  secure: always
- url: /css
  static_dir: public/css
  secure: always
- url: /img
  static_dir: public/img
  secure: always
- url: /js
  static_dir: public/js
  secure: always
- url: /.*
  secure: always
  redirect_http_response_code: 301
  script: auto
```



## 参考

[app.yaml 構成ファイル](https://cloud.google.com/appengine/docs/standard/php7/config/appref?hl=ja)