import React, { Component } from "react";
import ReactDOM from "react-dom";
import createSpace from "./helpers/createSpace";
import deleteSpace from "./helpers/deleteSpace";

class App extends Component {
  componentDidMount() {
    createSpace(this);
  }

  componentWillUnmount() {
    deleteSpace(this);
  }

  render() {
    return <div ref={ref => (this.mount = ref)} />;
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;
