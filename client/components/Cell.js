import React, { Component } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';

import styles from './Styles.js';

class Cell extends Component {

    render() {
        cellStyle = this.props.id%2 === 0 ? styles.cellOdd : styles.cellEven;
        return (
            <View style={{flex:1}}>
                <TouchableOpacity onPress={() => this.props.clicked(this.props.id)} style={cellStyle}>
                    <Animated.Text style={{fontSize : this.props.symbolSize}}>
                        {this.props.symbol}
                    </Animated.Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Cell;