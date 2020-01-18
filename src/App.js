import React, { Component } from 'react';

import GithubLogo from './media/gh.svg';

// bootstrap components
import Container from 'react-bootstrap/Container';

import './style/App.css';
import './style/dark-theme.css';

class App extends Component {
  componentDidMount() {
    document.title = 'ReactiveType';
  }

  render() {
    return (
      <Container className="App">
        <Signature />
        {this.props.children}
      </Container>
    );
  }
}

function Signature() {
  return (
    <div className="signature">
      <img className="gh-logo" src={GithubLogo} alt="Github Logo" />&nbsp; 
      <a href="https://github.com/samarthdave/reactive-type">
        <span>Samarth Dave</span>
      </a>
    </div>
  );
}

export default App;