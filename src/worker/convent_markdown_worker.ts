import * as marked from "marked";
//Web Workerを変数にセット
//typeScriptの型定義の兼ね合いで,self as anyと書くことで型チェックを回避する
//workerはWorkerという型と定義することでWebWorkerの処理を正しく型チェックできるようになる
const worker: Worker = self as any;
//メインスレッドからデータを渡された際に実行する関数を定義
worker.addEventListener("message", (e) => {
    //メインスレッドからのテキストデータ（マークダウン）を
    const text = e.data;
    //markedでhtmlに変換
    const html = marked(text);
    //メインスレッドに結果のhtmlを返却する
    worker.postMessage({ html })

})