import "./../scss/index.scss";

import App from "./components/App/App.jsx";
import Header from "./components/Header/Header.jsx";

const root = document.getElementById("app");
const header = document.getElementById("header");

ReactDOM.render(<App />, root);
ReactDOM.render(<Header />, header);
