import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// components
import App from './App';
import Home from './components/Home';

const createRoutes = () => (
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home}/>
      </Switch>
    </App>
  </Router>
);

export default createRoutes;