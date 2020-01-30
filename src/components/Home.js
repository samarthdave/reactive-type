import React, { Component } from 'react';

import ParagraphInput from './ParagraphInput';
import UserInput from './UserInput';
// react components
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { h1Style } from './../style';

class Home extends Component {
  
  state = {
    selectedText: '',
    selectedContent: '',
    // status of "game"
    wordCount: 0,
    wordList: [],
    currentLoc: -1,
    userType: '',
    // show speed, total time, etc.
    showResults: false,
  }

  componentDidMount() {
    const text = require('./../media/quote.json');

    const selectedText = `${text.type} - ${text.author}`;
    const selectedContent = text.content;

    // make an array by splitting with spaces
    const wordList = selectedContent.split(' ').filter(e => e.length > 0);
    
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
    const { currentLoc, wordList, interval } = this.state;

    // if hard restart (requires manual press of reset button)
    if (interval === -1) {
      return;
    }
    
    // check if the value of the box is equal to current word
    // and if the last letter is a space
    const isLastWord = currentLoc === wordList.length - 1;
    // some obscure/weird logic I wrote but don't quite understand entirely
    let v = isLastWord ? value : value.slice(0, value.length - 1);
    // don't ask... Actually, here goes:
    // if the user finished typing the FINAL word in the text, don't wait for a space
    // and stop the timer if the entire last word is successfully typed.
    // I **could** make this more concise :P
    const isExactString = v === wordList[currentLoc];
    if (isExactString && (value.endsWith(' ') || isLastWord)) {
      // if is last word, then quit & stop timer
      if (isLastWord) {
        // show speed results
        // this.setState({ showResults: true });
      }
    
      this.setState({
        [name]: '',
        // if is last word, restart the game
        currentLoc: (isLastWord ? 0 : currentLoc + 1),
      });
      return;
    }

    this.setState({
      [name]: value
    });
  }

  render() {
    const {
      selectedText,
      userType,
      wordList,
      currentLoc,
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

      </>
    );
  }
}

export default Home;