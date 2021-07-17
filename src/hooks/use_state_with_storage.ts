import { useState } from "react";

export const useStateWithStorage = (init: string, key: string): [string, (s: string) => void] => {
    //init: stringは初期値　useStateの引数同じ
    //key: stringはlocalStorageに保存する際のキー
    //[string,(s:string=> void)]
    const [value, setValue] = useState<string>(localStorage.getItem(key) || init)


    const setValueWithStorage = (nextValue: string): void => {
        setValue(nextValue)
        localStorage.setItem(key, nextValue)
    }

    return [value, setValueWithStorage]
}