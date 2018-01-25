import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import HomeContainer from './containers/HomeContainer';
import CustomersContainer from './containers/CustomersContainer'
import CustomerContainer from './containers/CustomerContainer';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={HomeContainer} />
          <Route exact path="/customers" component={CustomersContainer}/>
          <Switch>
            <Route path="/customer/new" component={CustomerContainer}/>
            <Route path="/customer/:dni" render={props => <CustomerContainer dni={props.match.params.dni}/>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
