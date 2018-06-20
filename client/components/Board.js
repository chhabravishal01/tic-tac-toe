import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, LayoutAnimation, Animated, TouchableOpacity, TouchableHighlight } from 'react-native';

import Utils from './Utils.js';

class Board extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Board</Text>
                <TouchableOpacity onPress={() => {this.props.changeView("login")}}> <Text style={styles.button} > Logout </Text> </TouchableOpacity>
            </View>
        )
    }
}

export default Board;

const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    //   backgroundColor: '#eee',
      height: 800,
    },

    row: {
        flexDirection: 'row',
    },

    credentialsContainer: {
        width : 300,
        alignItems : 'center',
        borderWidth : 1,
        borderColor : 'grey',
        borderRadius : 20,
        padding : 30
    },

    header : {
        fontSize: 30,
        marginBottom : 30,
    },

    input: {
      margin : 10,
      width: 250,
      fontSize: 20,
      padding : 10,
      borderRadius : 10,
      backgroundColor : '#eee',
    //   borderWidth: 1,
    },

    button: {
        width: 120,
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius : 10,
        color: 'blue',
        textAlign: 'center',
        margin: 10,
        marginTop: 50,
        padding: 10,
        fontSize: 15,
    },

    error: {
        marginTop: 10,
        color: 'red',
    }
  });