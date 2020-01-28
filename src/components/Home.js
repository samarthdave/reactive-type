import React, { Component } from 'react';

import ParagraphInput from './ParagraphInput';
import UserInput from './UserInput';
// react components
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

// update timer every quarter of a second
const TIMER_INTERVAL = 250;

class Home extends Component {
  
  state = {
    selectedText: '',
    selectedContent: '',
    // status of "game"
    wordCount: 0,
    wordList: [],
    currentLoc: -1,
    userType: '',
    // timer
    elapsedTime: 0,
    interval: 0,
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

  // timer functions
  countUp = () => {
    this.setState(({ elapsedTime }) => ({ elapsedTime: elapsedTime + TIMER_INTERVAL }));
  }
  startCounting = () => {
    this.setState({
      elapsedTime: 0.0001,
      interval: setInterval(this.countUp, TIMER_INTERVAL)
    });
  }

  // arrow syntax instead of binding
  userTyped = (e) => {
    const { name, value } = e.target;
    const { currentLoc, wordList, elapsedTime, interval } = this.state;

    // if hard restart (requires manual press of reset button)
    if (interval === -1) {
      return;
    }
    
    // check if has started typing
    if (!elapsedTime) {
      this.startCounting();
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
        // stop & clear the timer
        clearInterval(this.state.interval);
        // this.resetGame({ softRestart: false });
        // show speed results
        this.setState({ showResults: true });
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

  resetGame = ({ softRestart }) => {
    const { elapsedTime } = this.state;
    if (softRestart && !elapsedTime) {
      this.startCounting();
    }
    this.setState({
      // status of "game"
      currentLoc: 0,
      userType: '',
      // timer
      // NOT resetting elapsed time so user can see
      // elapsedTime: 0,
      interval: softRestart ? 0 : -1,
      elapsedTime: softRestart ? 0.001 : elapsedTime,
    });
  }

  restartButtonPress = () => {
    this.resetGame({ softRestart: true });
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
      wordCount,
      currentLoc,
      elapsedTime,
      showResults,
    } = this.state;

    const currentWord = wordList[currentLoc];
    let isError = currentWord ? !currentWord.includes(userType) : false;

    // timer funcs.
    const timeSoFar = (elapsedTime/1000).toFixed(0);
    const timerClassName = `timer ${currentLoc === 0 ? 'done' : ''}`;

    const minutesSoFar = timeSoFar / 60;
    const Results = showResults ? (
      <div>
        <h2>Word Count: {wordCount}</h2>
        <h2>Time: {minutesSoFar}</h2>
        <h2>Speed (wpm): {Math.round(wordCount / minutesSoFar * 100)/100}</h2>
      </div>
    ) : <div></div>;

    return (
      <>
        <Row>
          <Col>
            <h1 style={h1Style}>ReactiveType</h1>
            <h1 className={timerClassName}>
              <span>{timeSoFar}:00</span>&nbsp;
              <Button onClick={this.restartButtonPress}>Restart</Button>
            </h1>
            {Results}
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