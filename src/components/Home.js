import React, { Component } from 'react';

// react components
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';

class Home extends Component {
  
  state = {
    selectedText: '',
    selectedContent: ''
  }

  componentDidMount() {
    const text = require('./../docs/quote.json');

    this.setState({
      selectedText: `${text.type} - ${text.author}`,
      selectedContent: text.content
    });
  }

  render() {
    const h1Style = {
      textAlign: 'center',
      marginTop: '50px'
    };

    const {
      selectedText,
      selectedContent
    } = this.state;

    return (
      <>
        <Row>
          <Col>
            <h1 style={h1Style}>ReactiveType</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4 className="selected-text">Selected text: {selectedText}</h4>
            <br />
            <FormControl readOnly value={selectedContent} rows={4} as="textarea" aria-label="replicate-content" />
          </Col>
        </Row>
        <Row>
          <Col md={{ offset: 4, span: 4 }}>
            <Form.Control id="user-input" size="lg" type="text" placeholder="type here..." />
          </Col>
        </Row>
      </>
    );
  }
}

export default Home;