import React, { Component } from 'react';
import PropTypes from 'prop-types';

import utils from '../utils';
// react components
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

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
    const text = require('./../docs/quote.json');

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

function ParagraphInput({ wordList, activeIndex, userType }) {
  return (
    <Row>
      <Col>
        <div className="paragraph-input">
          {wordList.map((word, i) => {
            // if current word
            if (activeIndex === i) {
              // find the index until invalid text
              const { error, loc } = utils.findSubstringLoc(word, userType);
              // then slice at that index
              const a = word.slice(0, loc);
              const diffCount = userType.length - a.length;
              const b = word.slice(loc).substring(0, diffCount);
              const c = word.slice(loc + diffCount);
              // split those parts up with a span
              return <div key={i} className='active'>
                <span className="substr-a">{a}</span>
                <span className={`${error ? 'substr-b' : ''}`}>{b}</span>
                <span>{c}</span>
              </div>;
            } else {
              return <div key={i}>{word}</div>;
            }
          })}
        </div>
      </Col>
    </Row>
  );
}

ParagraphInput.propTypes = {
  wordList: PropTypes.array.isRequired,
  activeIndex: PropTypes.number.isRequired,
  userType: PropTypes.string.isRequired
};

function UserInput({ isError, userTyped, userType }) {
  return (
    <Row>
      <Col md={{ offset: 4, span: 4 }}>
        <Form.Control
          type="text" className={`${isError ? 'error' : ''}`}
          placeholder="type here..."
          autoFocus autoComplete="off"
          autoCorrect="off" autoCapitalize="off" spellCheck="false"
          onChange={userTyped}
          name="userType" id="user-input"
          value={userType} size="lg"
        />
      </Col>
    </Row> // user input row
  );
}

UserInput.propTypes = {
  isError: PropTypes.bool.isRequired,
  userTyped: PropTypes.func.isRequired,
  userType: PropTypes.string.isRequired
};

export default Home;