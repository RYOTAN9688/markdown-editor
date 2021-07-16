import * as React from "react";
import { render } from "react-dom";
import { createGlobalStyle } from "styled-components";
import { Editor } from "./pages/editor";


const Globalstyle = createGlobalStyle
    `
    body* {
        box-sizing: border-box;
    }
`

const Main = (
    <>
        <Globalstyle />
        <Editor />
    </>
)
render(Main, document.getElementById('app'));