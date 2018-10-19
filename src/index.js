import React from "react";
import ReactDOM from "react-dom";
import Container from "./Components/Container";
import "@atlaskit/css-reset";
import { Provider } from "react-redux";
import store from "./Store";


ReactDOM.render(
  <Provider store={store}>
    <Container/>
  </Provider>,
  document.getElementById("root")
);
