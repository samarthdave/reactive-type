import React, { Component } from 'react';

// bootstrap components
import Container from 'react-bootstrap/Container';

import './style/App.css';
import './style/warm-theme.css';

class App extends Component {
  componentDidMount() {
    document.title = 'ReactiveType';
  }

  render() {
    return (
      <Container className="App">
        {this.props.children}
      </Container>
    );
  }
}

export default App;