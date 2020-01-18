import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

        <ParagraphInput wordList={wordList}
            selectedText={selectedText} activeIndex={currentLoc} />
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

function ParagraphInput({ selectedText, wordList, activeIndex }) {
  return (
    <Row>
      <Col>
        <h4 className="selected-text">Selected text: {selectedText}</h4>
        <br />
      </Col>
      <Col>
        <div className="paragraph-input">
          {wordList.map((word, i) => {
            // TODO: highlight diff. in error of word
            // & convey how many letters are wrong
            if (activeIndex === i) {
              return <span key={i} className='active'>{word}</span>;
            } else {
              return <span key={i}>{word}</span>;
            }
          })}
        </div>
      </Col>
    </Row>
  );
}

ParagraphInput.propTypes = {
  selectedText: PropTypes.string,
  wordList: PropTypes.array,
  activeIndex: PropTypes.number
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