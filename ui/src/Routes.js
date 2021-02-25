import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import App from './App';
import Stock from './Stock';

export default function Routes() {
  return (
    <Router>
      <div>

        <Switch>
          <Route path="/:exchange/:symbol" children={<Stock />} />
          <Route path="/stocks" children={<App />} />
          <Route exact path="/">
            <Redirect to="/stocks" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

