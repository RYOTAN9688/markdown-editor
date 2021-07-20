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

const NUM_PER_PAGE: number = 10;

export const getMemoPageCount = async (): Promise<number> => {
    const totalCount = await memos.count();
    const pageCount = Math.ceil(totalCount / NUM_PER_PAGE)
    return pageCount > 0 ? pageCount : 1;
}

export const getMemos = (): Promise<MemoRecord[]> => {
    return memos.orderBy("datetime")
        .reverse()
        .toArray()
}

//keyはどの要素が変更、追加、削除されたかを識別する