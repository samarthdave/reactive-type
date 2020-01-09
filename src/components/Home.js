import React, { Component } from 'react';

// react components
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Home extends Component {

  render() {
    const h1Style = {
      textAlign: 'center',
      marginTop: '50px'
    };

    return (
      <Row>
        <Col>
          <h1 style={h1Style}>ReactiveType</h1>
        </Col>
      </Row>
    );
  }
}

export default Home;