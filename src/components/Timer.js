import React, { Component } from 'react';

// react components
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dummyTime: '0:00',
      dummySpeed: '20wpm',
      showWPM: false
    };
  }

  render() {
    const { dummyTime, dummySpeed, showWPM } = this.state;

    return (
      <Row>
        <Col md={{ span: 2, offset: 5 }}>
          <div className="timer">
            <h1>{dummyTime}</h1>
            {showWPM ? <h3>{dummySpeed}</h3> : ''}
          </div>
        </Col>
      </Row>
    );
  }
}

export default Timer;