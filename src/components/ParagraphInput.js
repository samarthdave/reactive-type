import React from 'react';
import PropTypes from 'prop-types';

import utils from '../utils';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

export default ParagraphInput;