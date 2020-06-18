import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Store from "./store";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import "./index.css";
import { createGlobalStyle } from "styled-components";
// import $ from "jquery";
import "./configs/axiosInterceptors"
// import { PersistGate } from "redux-persist/integration/react";

// const { persistor, store } = Store();
const { store } = Store()

const GlobalStyle = createGlobalStyle`
  body {
    background: #8360c3;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #8360c3, #2ebf91 );  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #8360c3, #2ebf91 ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    background-attachment: fixed;
    box-sizing: border-box;
    transition: all 0.5s ease-in;
    margin: 0 ;
    padding: 0 ;
  }
`;

ReactDOM.render(
  <Provider store={store}>
    
      <GlobalStyle />
      <App />
    
  </Provider>,
  document.getElementById("root")
);

// $(document).bind("DOMNodeRemoved", function(e) {
//   // console.log("Removed: " + e.target.nodeName);
// });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
