import React, {Component} from 'react';
import { StyleSheet, Text, View, LayoutAnimation, Animated, TouchableOpacity, } from 'react-native';

import Login from './components/Login.js';
import SignUp from './components/SignUp.js';
import Board from './components/Board.js';

import Utils from './components/Utils.js';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      view : "login",
    }
    
    Utils.checkToken()
    .then( (res) =>
        res != null ? this.setState({view : "board"}) : this.setState({view : "login"})
    );

    this.changeView = this.changeView.bind(this);
  }
  
  changeView(view) {
    
    if (view !== "board") {
      Utils.logout()
    }
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.setState({view: view});
  }

  render() {

    let view = this.state.view;

    if (view === "board") {
      return <Board changeView={this.changeView}/>
    }
    else if (view === "login") {
      return <Login changeView={this.changeView} />
    }
    else if (view === "signUp") {
      return <SignUp changeView={this.changeView}/>
    }
  }
}