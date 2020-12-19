title: Laravelでのマルチ認証実装時のRedirectIfAuthenticated
date: 2019-12-03
category: PHP
---

## 概要

`Laravel5.8`でuserとadminを分けるマルチ認証を実装しました。  
その際、adminで認証済みのユーザがログインページに遷移した時に、認証済みであるにも関わらず、ログインページが表示されていました。  
本来、認証済みであるならばログインページに遷移せず、ログイン後のページに遷移するのが正しいです。  

この処理は`app/Http/Middleware/RedirectIfAuthenticated.php`に記載されていますが、調査すると引数の`$guest`がnullであることがわかりました。  
nullだと`config/auth.php`で定義されたdefaultsのguardをチェックするので、正しいチェックになりません。

## 解決

ログインページはroute定義でmiddlewareにguestを定義していますが、その際、パラメータでadminを渡していなかったことが原因でした。  
以下のようにして解決。

```php
Route::group(['prefix' => 'admin', 'middleware' => 'guest:admin'], function () {
    Route::get('login', 'Admin\AdminLoginController@showLoginForm')->name('admin.login');
    Route::post('login', 'Admin\AdminLoginController@login');
});
```
    