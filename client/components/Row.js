import React, { Component } from 'react';
import { View } from 'react-native';

import Cell from './Cell.js';
import styles from './Styles.js';

class Row extends Component {
    render() {
        let rowNum = this.props.id;
        let symbols = this.props.symbols;

        let row = [];
        for (let i = 0; i < 3; i++) {
            cellId = rowNum*3 + i;
            symbol = symbols[cellId];
            
            cell = <Cell key={cellId} id={cellId} clicked={this.props.clicked} symbolSize= {this.props.symbolSize} symbol= {symbol} />
            row.push(cell);
        }
        return (
            <View key={rowNum} style={styles.row}>
                {row}
            </View>
        )
    }

}

export default Row;