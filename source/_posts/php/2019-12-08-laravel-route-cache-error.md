title: Laravel-Cacheファイル生成時のエラー
date: 2019-12-08
category: PHP
---


## デプロイ時のCacheファイル生成

以下の公式のデプロイドキュメントに沿って作業したところ、キャッシュファイル生成でエラーが出たのでその話です。  

[デプロイ 5.8 Laravel](https://readouble.com/laravel/5.8/ja/deployment.html)


## ConfigのCache

`php artisan config:cache`を実行したところ、以下のエラーが発生しました。  

```
Configuration cache cleared!

   LogicException  : Your configuration files are not serializable.

  at /home/vagrant/code/vendor/laravel/framework/src/Illuminate/Foundation/Console/ConfigCacheCommand.php:71
    67|             require $configPath;
    68|         } catch (Throwable $e) {
    69|             $this->files->delete($configPath);
    70|
  > 71|             throw new LogicException('Your configuration files are not serializable.', 0, $e);
    72|         }
    73|
    74|         $this->info('Configuration cached successfully!');
    75|     }

  Exception trace:

  1   Error::("Call to undefined method Illuminate\Validation\Rules\In::__set_state()")
      /home/vagrant/code/bootstrap/cache/config.php:225

  2   require()
      /home/vagrant/code/vendor/laravel/framework/src/Illuminate/Foundation/Console/ConfigCacheCommand.php:67

```

configファイルでarrayを返す以外のことをしていると発生するようです。  
私はconfig配下にconsts.phpを作って定数などを管理していたのですが、validationの定義なども共通にしようと管理していたのが間違いでした。  
以下のような記述はNG。  

```php
use Illuminate\Validation\Rule;

return [
  'yes_no_validate' => ['required', Rule::in(['yes', 'no'])],
]; 
```


## RouteのCache

`php artisan route:cache`を実行したところ、以下のエラーが発生しました。  

```
Route cache cleared!

   LogicException  : Unable to prepare route [terms] for serialization. Uses Closure.

  at /home/vagrant/code/vendor/laravel/framework/src/Illuminate/Routing/Route.php:917
    913|      */
    914|     public function prepareForSerialization()
    915|     {
    916|         if ($this->action['uses'] instanceof Closure) {
  > 917|             throw new LogicException("Unable to prepare route [{$this->uri}] for serialization. Uses Closure.");
    918|         }
    919|
    920|         $this->compileRoute();
    921|

  Exception trace:

  1   Illuminate\Routing\Route::prepareForSerialization()
      /home/vagrant/code/vendor/laravel/framework/src/Illuminate/Foundation/Console/RouteCacheCommand.php:62

  2   Illuminate\Foundation\Console\RouteCacheCommand::handle()
      /home/vagrant/code/vendor/laravel/framework/src/Illuminate/Container/BoundMethod.php:32

```

これはRoute定義でコントローラに渡さず、そのままviewを呼んでいるためでした。  
以下のようになっていたので修正。  

```php
Route::get('/terms', function () {
    return view('static/terms');
});

↓

Route::get('/terms', 'StaticPageController@terms');
```


## 終わりに

デプロイするタイミングになってデプロイのドキュメントを読んだのですが、`php artisan config:cache`はデプロイするとき呼ぶのだから、開発中は使用するものではないようですね。  
結構、`php artisan config:cache`を呼ぶことを解決策として紹介されているのをよく見ます。