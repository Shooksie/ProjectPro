import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import qs from 'qs';


class App extends React.Component {
  state = {
    whatToRender: (<div>HELLO</div>)

  };

  render() {
    return this.state.whatToRender
  }
}

class UpdateComponent extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (<button></button>)
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));