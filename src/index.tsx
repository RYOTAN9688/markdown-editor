import * as React from "react";
import { render } from "react-dom";
import { createGlobalStyle } from "styled-components";
import {
  //HashRouter as Routerはエイリアスの記法で、HashRouter要素をRouterというなまえで扱うという意味
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { Editor } from "./pages/editor";
import { History } from "./pages/history";
import { useStateWithStorage } from "./hooks/use_state_with_storage";

const GlobalStyle = createGlobalStyle`
  body * {
    box-sizing: border-box;
  }
`

const StorageKey = "/editor:text"
const Main: React.FC = () => {
  //エディタ画面で管理していた状態を管理する
  const [text, setText] = useStateWithStorage("", StorageKey)
  return (
    <>
      <GlobalStyle />
      <Router>
        <Route exact path="/editor">
          <Editor
            text={text}
            setText={setText}
          />
        </Route>
        <Route exact path="/history" >
          <History
            setText={setText} />
        </Route>
        <Redirect to="/editor" path="" />
      </Router>
    </>
  )
}
render(<Main />, document.getElementById('app'));