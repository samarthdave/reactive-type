import React from 'react';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

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

export default UserInput;