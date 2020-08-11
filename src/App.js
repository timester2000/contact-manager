import React, { Component } from 'react';
import './App.css';
import Header from './component/layout/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router, Route, Switch }
from 'react-router-dom';
import Contacts from './component/contacts/Contacts';
import { Provider } from './context'
import AddContact from './component/contacts/AddContact';
import About from './component/pages/About';
import NotFound from './component/pages/NotFound';
import Test from './component/test/Test';
import EditContact from './component/contacts/EditContact';

class App extends Component {
  render() {
    return (
      <Provider>
        <Router >
          <div className="App">
            <Header branding="Contact List"/>
            <div className="container">
              <Switch >
                <Route
                  exact
                  path="/contact/add"
                  component = {AddContact}
                />
                <Route
                  exact path="/contact/edit/:id"
                  component = {EditContact}
                />
                <Route
                  exact path="/about"
                  component = {About}
                />
                <Route
                  exact path="/"
                  component = {Contacts}
                />
                <Route
                  exact path="/test"
                  component = {Test}
                />
                <Route
                  component = {NotFound}
                />          
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    )
  }
}
export default App;
