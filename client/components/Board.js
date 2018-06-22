import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Animated } from 'react-native';

import Utils from './Utils.js';
import Row from './Row.js';
import styles from './Styles.js';

class Board extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userDetails : "",
            userName : "-",
            symbols : [ '', '', '' ,
                        '', '', '' ,
                        '', '', '' ],
            infoLabel : "Next Move :  ",
            nextSymbol : 'X',
            symbolSize : new Animated.Value(90),
            result : "",
            occupiedCells : 0,
        }

        this.clicked = this.clicked.bind(this);
    }

    componentDidMount() {
        Utils.checkToken()
        .then((token) => {
            if (token) {
                let userDetails = Utils.getUserDetails(token);
                this.setState({userName : userDetails.userName})
            }            
        })
    }

    clicked(cellNo) {
        // alert(this.refs.c0);
        // this.refs.c0.measure((x,y,w,h) => {
        //     alert(h)
        // })

        var symbols = this.state.symbols;
        if (symbols[cellNo] ==="") {
            symbols[cellNo] = this.state.nextSymbol;

            nextSymbol = this.state.nextSymbol === 'X' ? 'O' : 'X';

            let occupiedCells = this.state.occupiedCells;
            occupiedCells++;

            
            this.setState({symbols, nextSymbol, occupiedCells}, () => {
                if (this.state.occupiedCells === 9) {
                    this.setState({infoLabel : "End", nextSymbol : ""})
                }
            });


            Animated.parallel([
                Animated.sequence([
                    Animated.timing(
                        this.state.symbolSize,
                        {
                            toValue : 70,
                            duration : 100,
                        }
                    ),
                    Animated.spring(
                        this.state.symbolSize,
                        {
                            toValue : 90,
                            friction : 2,
                        }
                    ),
                ]),
            ]).start();

        }
    }

    render() {
        let size = this.state.symbolSize;

        return (
            <View style={styles.container}>

                <View style={[styles.topBar]}>
                    <Text style={styles.user}> {this.state.userName} </Text>
                    <TouchableOpacity onPress={() => {this.props.changeView("login")}}> <Text style={styles.logout} > Logout </Text> </TouchableOpacity>
                </View>
}

                <View style={[styles.board]}>
                    <Row id='0' clicked={this.clicked} symbolSize= {size} symbols= {this.state.symbols} />
                    <Row id='1' clicked={this.clicked} symbolSize= {size} symbols= {this.state.symbols} />
                    <Row id='2' clicked={this.clicked} symbolSize= {size} symbols= {this.state.symbols} />
                </View>

                <View style={[styles.infoSection]}>
                    <View style={{flexDirection: 'row', paddingLeft : 30}}>
                        <Text style={[{fontSize : 25}]}> {this.state.infoLabel} </Text>

                        <View style={[{alignItems : 'flex-start', flex: 1}]}>
                            <Text style={[{fontSize : 25,}]}>
                                {this.state.nextSymbol}
                            </Text>
                        </View>
                     </View>
                    
                    // {
                    // <Text style={styles.user}> Symbols : {this.state.symbols} </Text>
                    // <Text style={styles.user}> Moves : {this.state.occupiedCells} </Text>
}
                </View>

                
                
            </View>
        )
    }
}

export default Board;