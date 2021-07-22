import * as marked from "marked";
import * as sanitizeHtml from "sanitize-html";

//Web Workerを変数にセット
//typeScriptの型定義の兼ね合いで,self as anyと書くことで型チェックを回避する
//workerはWorkerという型と定義することでWebWorkerの処理を正しく型チェックできるようになる
const worker: Worker = self as any;
//メインスレッドからデータを渡された際に実行する関数を定義
worker.addEventListener("message", (e) => {
    //メインスレッドからのテキストデータ（マークダウン）を
    const text = e.data;
    //sanitize（危険なコードやデータを変換または除去して無力化する処理）されたHTMLを出力
    //オプションで渡しているallwedTagsは許可するHTMLのタグを列挙する
    //sanitizeHtmlではh1,h2はデフォルトで除外されているので追加している。
    const html = sanitizeHtml(marked(text), { allowedTags: [...sanitizeHtml.defaults.allowedTags, "h1", "h2"] })
    //メインスレッドに結果のhtmlを返却する
    worker.postMessage({ html })

})