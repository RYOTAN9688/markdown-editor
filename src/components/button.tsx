import * as React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
background-color: dodgerblue;
border : none;
box-shadow: none;
color: white;
font-size: 1rem ;
height: 2rem;
min-width: 5rem;
padding: 0 1rem;

&.cancel{
    background : white;
    border: 1px solid gray;
    color : gray;
}
`

//このコンポーネントに渡すパラメーターの型を定義する
//childrenはボタン内に表示するテキスト
//onClickはボタンをクリックした場合の処理関数
interface Props {
    cancel?: boolean
    children: string
    onClick: () => void
}

// React.FC<Props> のように定義すると、引数の props は Props であると型を明示できます
export const Button: React.FC<Props> = (props) => (

    //渡されたテキストとクリック時の処理関数を使ってコンポ―ネントを描画
    <StyledButton
        onClick={props.onClick}
        className={props.cancel ? `cancel` : ''}>
        {props.children}
    </StyledButton>
)