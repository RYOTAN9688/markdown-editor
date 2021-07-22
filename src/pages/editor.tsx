import *as React from 'react';
import styled from 'styled-components';
import { useStateWithStorage } from '../hooks/use_state_with_storage';
import { putMemo } from '../indexeddb/memos';
import { Button } from '../components/button';
import { SaveModal } from '../components/save_model';
import { Link } from 'react-router-dom';
import { Header } from '../components/header';
import ConvertMarkdownWorker from "worker-loader!../worker/convent_markdown_worker"
//インスタンス（処理を実行する状態のもの）を生成する処理
const convertMarkdownworker = new ConvertMarkdownWorker()

const { useState, useEffect } = React




const Wrapper = styled.div`
    display: flex;
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: 3rem;
`

const HeaderArea = styled.div`
    position: fixed;
    right: 0;
    top:0;
    left:0
`

const TextArea = styled.textarea`
    border-right: 1px solid silver;
    border-top: 1px solid silver;
    bottom: 0;
    font-size: 1rem;
    left: 0;
    padding: 0.5rem;
    position: absolute;
    top: 0;
    width: 50vw;
`

const Preview = styled.div`
    border-top: 1px solid silver;
    bottom: 0;
    overflow-y: scroll;
    padding: 1rem;
    position: absolute;
    right: 0;
    top: 0;
    width: 50vw;
`


interface Props {
    text: string
    setText: (text: string) => void
}

export const Editor: React.FC<Props> = (props) => {
    const { text, setText } = props

    //モーダルを表示するかどうかのフラグ管理をする
    //管理する値はboolean値　初期状態ではモーダルを出さないためfalse
    const [showModal, setShowModal] = useState(false)
    const [html, setHtml] = useState("")


    useEffect(() => {
        convertMarkdownworker.onmessage = (e) => {
            setHtml(e.data.html)
        }
    }, [])

    useEffect(() => {
        convertMarkdownworker.postMessage(text)
    }, [text])

    return (
        <>

            <HeaderArea>
                <Header title="Markdown Editor">
                    <Button onClick={() => setShowModal(true)}>
                        保存する
                    </Button>
                    <Link to="/history">
                        履歴を見る
                    </Link>
                </Header>
            </HeaderArea>
            <Wrapper>

                <TextArea
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                />
                <Preview>
                    <div dangerouslySetInnerHTML={{ __html: html }} />
                </Preview>
            </Wrapper>

            {showModal && (
                <SaveModal
                    onSave={(title: string): void => {
                        putMemo(title, text)
                        setShowModal(false)
                    }}
                    onCancel={() => setShowModal(false)}
                />
            )}
        </>
    )
}