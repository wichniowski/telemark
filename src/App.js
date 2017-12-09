import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Controls from './containers/Controls';
import Overlay from './containers/Overlay';
import Rack from './containers/Rack';
import Radio from './containers/Radio';

import './App.css';

const TelemarkSynth = () => (
  <div>
    <Overlay />
    <Rack />
    <Controls />
  </div>
)

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={() => TelemarkSynth()} />
            <Route path="/radio" component={Radio} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
