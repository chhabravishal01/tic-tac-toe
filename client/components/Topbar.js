import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from './Styles.js';

class Topbar extends Component {

    render() {
        return (
            <View style={[styles.topBar]}>
                <Text style={styles.user}> {this.props.userName} </Text>
                <TouchableOpacity onPress={() => {this.props.changeView("login")}}> <Text style={styles.logout} > Logout </Text> </TouchableOpacity>
            </View>
        )
    }

}

export default Topbar;