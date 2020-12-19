title: go言語でリバースプロキシ
date: 2016-08-10
category: Golang
---

## httputilのReverseProxyを使う

go言語でリバースプロキシを立てるには、httputilパッケージにある[ReverseProxy](https://golang.org/pkg/net/http/httputil/#ReverseProxy)を使うと簡単。
ReverseProxyはhttp.Handlerインタフェースを実装していて、http.ServerのHandlerに渡せる。
以下はlocalhost:9000のリクエストをlocalhost:9001に移譲する処理。

```go

package main

import (
	"log"
	"net/http"
	"net/http/httputil"
)

func main() {
	director := func(request *http.Request) {
		request.URL.Scheme = "http"
		request.URL.Host = ":9001"
	}
	rp := &httputil.ReverseProxy{Director: director}
	server := http.Server{
		Addr:    ":9000",
		Handler: rp,
	}
	if err := server.ListenAndServe(); err != nil {
		log.Fatal(err.Error())
	}
}

```

## 別ドメインへの移譲

あんまりないケースかもしれないが、localhost:9000のアクセスを別のドメインに移譲する場合は以下。
bodyやヘッダをそのままコピーして新しいhttpのリクエストを生成しなおす必要がある。

```go

package main

import (
	"bytes"
	"io/ioutil"
	"log"
	"net/http"
	"net/http/httputil"
)

func main() {
	director := func(request *http.Request) {
		url := *request.URL
		url.Scheme = "https"
		url.Host = "kido0617.github.io"

		buffer, err := ioutil.ReadAll(request.Body)
		if err != nil {
			log.Fatal(err.Error())
		}
		req, err := http.NewRequest(request.Method, url.String(), bytes.NewBuffer(buffer))
		if err != nil {
			log.Fatal(err.Error())
		}
		req.Header = request.Header
		*request = *req
	}
	rp := &httputil.ReverseProxy{Director: director}
	server := http.Server{
		Addr:    ":9000",
		Handler: rp,
	}
	if err := server.ListenAndServe(); err != nil {
		log.Fatal(err.Error())
	}
}

```

## 参考

[Golang Reverse Proxy ](http://r7kamura.github.io/2014/07/20/golang-reverse-proxy.html)
[Reverse Proxy in Go ](http://blog.charmes.net/2015/07/reverse-proxy-in-go.html)
[ichigo](https://github.com/wacul/ichigo)