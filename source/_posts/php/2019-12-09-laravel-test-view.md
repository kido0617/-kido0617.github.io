title: Laravel-テスト時にviewに渡されたパラメータをチェックする
date: 2019-12-09
category: PHP
---

`Laravel5.8`でコントローラからビューに渡しているパラメータをテストでチェックしたかったのでその方法です。  
例えば、viewに$commentsを渡します。  

```
return view('top', ['comments' => $comments]);
```

以下のようにテストのhttpリクエストの結果に対して、`getOriginalContent()->getData()`すればパラメータを取得できるようです。  

```
$response = $this->get('/');
$response->assertStatus(200);
$data = $response->getOriginalContent()->getData();
$this->assertEquals(5, count($data['comments']));
```