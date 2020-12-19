title: SalesforceのAPIでリードが作れない
date: 2017-02-03
category: Salesforce
---

[前記事](/salesforce/2017-02-02-salesforce-rest-api/)でAPIを使ってAccount(取引先)のデータを作ることができた。
次にLead(リード)のデータを作ろうと思った。
試しに /services/data/v38.0/sobjects/Lead/ に以下のデータをPOSTしてみた。

```json
{
  "Name" : "John",
  "Company" : "test"
}
```

すると、以下のようなレスポンスが返ってきた。

```json
[
  {
    "message": "Unable to create/update fields: Name. Please check the security settings of this field and verify that it is read/write for your profile or permission set.",
    "errorCode": "INVALID_FIELD_FOR_INSERT_UPDATE",
    "fields": [
      "Name"
    ]
  }
]
```

Nameフィールドに対して、権限がないようなエラーである。しかし、権限も何も特別なことをしている記憶はない。
これにすごい時間を取られたが、どうやらリードのNameは人名であり、LastNameとFirstNameに分ける必要があるらしい。
というわけで、以下のデータを送ったところ、無事作成できた。こんなのはまるに決まってる。

```json
{
  "FirstName" : "john",
  "LastName" : "Smith",
  "Company" : "test"
}
```