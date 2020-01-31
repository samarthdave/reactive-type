import React, { Component } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// custom components
import ParagraphInput from './ParagraphInput';
import UserInput from './UserInput';
import Timer from './Timer';

import { h1Style } from './../style';

class Home extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      contentTitle: '',
      // status of "game"
      wordCount: 0,
      wordList: [],
      currentLoc: -1,
      userType: '',
    };

    this.userTyped = this.userTyped.bind(this);
  }

  componentDidMount() {
    const text = require('./../media/quote.json');

    const contentTitle = `${text.type} - ${text.author}`;
    const contentBody = text.content;

    // make an array by splitting with spaces
    const wordList = contentBody.split(' ').filter(e => e.length > 0);
    
    if (!contentBody || wordList.length === 0) { // error: handle later
      return;
    }

    this.setState({
      contentTitle,
      wordList,
      wordCount: wordList.length,
      currentLoc: 0
    });
  }

  // arrow syntax instead of binding
  userTyped(e) {
    const { name, value } = e.target;

    const { wordList, currentLoc } = this.state;

    // if last character was a space, check for equality
    const typedSpace = value[value.length - 1] === ' ';

    if (!typedSpace) {
      return this.setState({
        [name]: value,
      });
    }

    // if the last thing typed was a space
    // check if the substring is equal
    const isEqual = value.slice(0, value.length - 1) === wordList[currentLoc];

    if (isEqual) {
      // increment by 1 of the current location & empty input box
      return this.setState((prevState) => {
        return {
          [name]: '',
          currentLoc: prevState.currentLoc + 1
        };
      });
    }
  
  }

  render() {
    const {
      contentTitle,
      userType,
      wordList,
      currentLoc,
    } = this.state;

    const currentWord = wordList[currentLoc];
    let isError = currentWord ? !currentWord.includes(userType) : false;

    const inputProps = { isError, userTyped: this.userTyped, userType };

    return (
      <>
        <Row>
          <Col>
            <h1 style={h1Style}>ReactiveType</h1>
          </Col>
        </Row> {/* end title row */}

        <Row>
          <Col>
            <h4 className="selected-text">Selected text: {contentTitle}</h4>
          </Col>
        </Row>
        <br />

        <Timer />
        <br/>

        <ParagraphInput userType={userType} wordList={wordList} activeIndex={currentLoc} />
        <br />

        <UserInput {...inputProps} />

      </>
    );
  }
}

export default Home;