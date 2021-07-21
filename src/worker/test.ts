//Web Workerを変数にセット
//typeScriptの型定義の兼ね合いで,self as anyと書くことで型チェックを回避する
//workerはWorkerという型と定義することでWebWorkerの処理を正しく型チェックできるようになる
const worker: Worker = self as any;
//メインスレッドからデータを渡された際に実行する関数を定義
worker.addEventListener("message", (e) => {
    //メインスレッドから渡されたデータをコンソールに出力 関数の引数内のdataというパラメーター（仮引数）がメインスレッドから渡された値になる
    console.log("worker Received:", e.data);
    //postMessage関数を呼び出し、メインスレッドへ処理結果を送信
    worker.postMessage({ result: e.data })

})