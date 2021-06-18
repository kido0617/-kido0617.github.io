title: Laravel sitemap.xmlを作る
date: 2021-06-17
category: PHP
---

## 大規模なsitemap.xmlを作る

sitemap.xmlは1つのファイルに5万件という制約があります。  
その件数を超えるようなサイトはsitemap.xmlを分割する必要があり、今回その対応が必要でした。  
Laravelでsitemap.xmlを作るのには[laravelium/sitemap](https://github.com/Laravelium/laravel-sitemap)を使うのが便利です。  
Laravelのバージョンごとに使うバージョンが異なるので正しいバージョンをインストールします。  

## sitemap index

sitemap indexファイルを作り、sitemap.xmlを分割します。  
[公式ドキュメント](https://github.com/Laravelium/laravel-sitemap/wiki/Sitemap-index)にサンプルがあるので合わせて参考にしてください。  

下記のようにルーティングを設定します。  
別にURLに.xmlが必要なわけではないので、`/sitemap`をindexファイルとし、`/sitemap/xxx`をタイプ別にsitemapを生成するように分割します。

```php
Route::get('sitemap/{type?}', 'SitemapController@index');
```

以下にControllerを載せています。  
$typeがnullのときはインデックスを表示し、$typeが指定されたときは、タイプ別のsitemapを表示するようにすれば適切に分割できます。  

```php

class SitemapController extends Controller
{
    public function index($type = null)
    {
        $sitemap = App::make('sitemap');
        switch ($type) {
            case null:
                //インデックス
                $sitemap->model->setSitemaps(['loc' => url('sitemap/type1'), 'lastmod' => null]);
                $sitemap->model->setSitemaps(['loc' => url('sitemap/type2'), 'lastmod' => null]);
                $sitemap->model->setSitemaps(['loc' => url('sitemap/type3'), 'lastmod' => null]);
            case 'type1':
                $sitemap->add(URL::to('/'), null, '1.0', 'daily');
                //適当にURLをaddしていく
                break;
            case 'type2':
                //type1と同様にsitemapに5万件を超えないようにaddする
                break;
            case 'type3':
               //type1と同様にsitemapに5万件を超えないようにaddする
                break;
        }
        //描画
        return $sitemap->render('xml');
    }
}

```