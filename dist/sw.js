//キャッシュの名前を定義。キャッシュAPIは、このキャッシュに応じて別のキャッシュを
//提供してくれる。例えば一度キャッシュの内容をリセットしたい場合は、キャッシュ名を変更することで新しい状態にできる。
//キャッシュ名は任意の文字列でよいが、バージョンがわかるように定義したほうが良い
const CacheName = "Cache:v1"

self.addEventListener("install", (event) => {
    console.log("ServiceWorker install:", event);
})

self.addEventListener("activate", (event) => {
    console.log("ServiceWorker activate:", event);
})


const networkFallingBackToCache = async (request) => {
    //定義した名前でキャッシュを開く
    //cacheインターフェイスは、Request / Responseオブジェクトのペアのためのストレージの仕組みを提供する
    //リクエストに対してレスポンスを保持してくれるシンプルな仕組みでキャッシュを提供してくれる
    const cache = await caches.open(CacheName)
    try {
        //通常のfetchリクエストを実行してレスポンスを取得する
        const response = await fetch(request)
        //レスポンス内容をキャッシュに保存している。なおresponse.clone()でレスポンスの内容をこぴーしてから保存しなければならない。
        //これはレスポンスの内部で一度しか読み取りできない処理があるため。
        await cache.put(request, response.clone())
        //レスポンスを呼び出しもとに返却
        return response;
        //リクエストにエラーが発生した場合、
    } catch (err) {
        //コンソールにエラーを出す
        console.error(err);
        //キャッシュの内容を返却する
        return caches.match(request)
    }
}

//Fetchイベント時に実行する処理を登録。fetchとはネットワーク
//を経由してリソースを取得するために使用するapi
self.addEventListener("fetch", (event) => {
    //
    event.respondWith(networkFallingBackToCache(event.request))
})


