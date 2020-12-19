title: ファイルを更新日付順でソートする
date: 2013-01-06
category: PHP
---

PHPでファイル取得して更新日付順でソートしたい。
手順としては、ディレクトリ内のファイルを取得する際にそのファイルの日付も一緒に取得しておき、配列に保存したファイルを、日付順でソートする流れとなる。

``` php
$dir_name ="/img/";            
$dir = opendir($dir_name);
$file_list = array();             //ファイル名を保存する配列
$time_list = array();           //ファイルの日付を保存する配列
while (false !== ($file = readdir($dir))){  //ディレクトリ走査
    //先頭文字が"." のファイルを除外
    if($file[0] != "."){
        $time_list[] = filemtime($dir_name.$file);    //ソート用にファイル時刻を取得
        $file_list[] = $file;   //ファイル名を取得
    }
}
closedir($dir);
array_multisort($time_list,SORT_DESC,$file_list);         //時刻でソート
```

array_multisort　で配列を別の配列でソートできるのでこれを使う。