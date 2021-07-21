import Dexie from "dexie";


//Typescriptの型定義であって、indexedDBに対する設定ではない
export interface MemoRecord {
    datetime: string
    title: string
    text: string
}


//Dexieのインスタンスを生成
const database = new Dexie("markdown-editor");
//.version(1) はデータベースのバージョンです
//.stores() で使用するテーブルとインデックスとなるデータ名を指定
//インデックス以外のデータ名は指定しなくてよい
database.version(1).stores({ memos: "&datetime" });
//データを扱うテーブルクラスを取得
//exie.Table<MemoRecord, string> は「2-3」でも出てきた総称型で型を定義している
//最初の MemoRecord はデータの型で、2つ目の string はキーとなるデータ（今回は datetime）の型
const memos: Dexie.Table<MemoRecord, string> = database.table("memos");


export const putMemo = async (title: string, text: string): Promise<void> => {
    const datetime = new Date().toISOString();
    await memos.put({ datetime, title, text });
}

//indexedDBからページ総数を取得する

//１ページあたりの件数を10件とする
const NUM_PER_PAGE: number = 10;

export const getMemoPageCount = async (): Promise<number> => {
    const totalCount = await memos.count();
    const pageCount = Math.ceil(totalCount / NUM_PER_PAGE)
    return pageCount > 0 ? pageCount : 1;
}

export const getMemos = (page: number): Promise<MemoRecord[]> => {
    //ページ数をもとに、取得する最初の位置を算出する
    const offset = (page - 1) * NUM_PER_PAGE
    return memos.orderBy("datetime")
        .reverse()
        //offsetは取得するリスト内の開始位置を設定する(offset(20)とした場合、20件目以降を取得する)
        .offset(offset)
        //limitは取得する件数を指定（page に3が設定されている場合、30件目から10件を取得できる
        .limit(NUM_PER_PAGE)
        .toArray()
}

//keyはどの要素が変更、追加、削除されたかを識別する