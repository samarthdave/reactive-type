import React, { Component } from 'react';

import ParagraphInput from './ParagraphInput';
import UserInput from './UserInput';
// react components
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Home extends Component {
  
  state = {
    selectedText: '',
    selectedContent: '',
    // status of "game"
    wordCount: 0,
    wordList: [],
    currentLoc: -1,
    userType: ''
  }

  componentDidMount() {
    const text = require('./../media/quote.json');

    const selectedText = `${text.type} - ${text.author}`;
    const selectedContent = text.content;

    // make an array by splitting with spaces
    const wordList = selectedContent.split(' ');
    
    if (!selectedContent || wordList.length === 0) { // error: handle later
      return;
    }

    this.setState({
      selectedText,
      selectedContent,
      wordList,
      wordCount: wordList.length,
      currentLoc: 0
    });
  }

  // arrow syntax instead of binding
  userTyped = (e) => {
    const { name, value } = e.target;
    const { currentLoc, wordList } = this.state;
    
    // check if the value of the box is equal to current word
    // and if the last letter is a space
    if (value.endsWith(' ') // short circuit
      && value.slice(0, value.length-1) === wordList[currentLoc]) {
      // empty the input, count up by one
      const newState = {
        [name]: '',
        currentLoc: currentLoc + 1
      };
      this.setState(newState);
      return;
    }

    this.setState({
      [name]: value
    });
  }

  render() {
    const h1Style = {
      fontSize: '3.75rem',
      textAlign: 'center',
      marginTop: '50px'
    };

    const {
      selectedText,
      userType,
      wordList,
      currentLoc
    } = this.state;

    const currentWord = wordList[currentLoc];
    let isError = currentWord ? !currentWord.includes(userType) : false;

    return (
      <>
        <Row>
          <Col>
            <h1 style={h1Style}>ReactiveType</h1>
          </Col>
        </Row> {/* end title row */}

        <Row>
          <Col>
            <h4 className="selected-text">Selected text: {selectedText}</h4>
            <br />
          </Col>
        </Row>
        <ParagraphInput userType={userType} wordList={wordList} activeIndex={currentLoc} />
        <br />

        <UserInput isError={isError} userTyped={this.userTyped} userType={userType} />

        {/* <br />
        <Row>
          <hr />
          <Col>
            <FormControl readOnly value={selectedContent} rows={4} as="textarea" aria-label="replicate-content" />
          </Col>
        </Row> */}
      </>
    );
  }
}

export default Home;