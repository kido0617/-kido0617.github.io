title: GAEに画像をアップロードするのが遅い
date: 2019-12-16
category: GCP
---

GAEでLaravelをデプロイして、フォームからユーザに画像をアップロードする機能を実装しました。  
アップロードした画像はGAEを経由してCloud Storageに保存します。  
しかし、ユーザ→GAEのアップロードが非常に遅いことがわかりました。  
GAEを経由してCloud Storageに保存するので無駄なルートだとは思いますが、そもそもユーザからGAEにアップロードするルートが非常に重いのです。  
仕方ないので、Firebaseを使用し、直接ユーザがCloud Storageにアップロードすることにしました。  
実装は以下のとおりです。  

[Firebaseのstorageにformの画像をアップロードする](/js/2019-12-01-firebase-form-upload/)