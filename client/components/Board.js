import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Animated } from 'react-native';

import Utils from './Utils.js';
import Row from './Row.js';
import styles from './Styles.js';
import Topbar from './Topbar.js';

class Board extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userDetails : "",
            userName : "-",
            symbols : [ '', '', '' ,
                        '', '', '' ,
                        '', '', '' ],
            symbolSize : new Animated.Value(90),
            nextSymbol : 'X',
            infoLabel : "Next Move :  ",
            infoSize : new Animated.Value(25),
            occupiedCells : 0,
            gameEnd : false,
            boardOpacity : new Animated.Value(1),
        }

        this.combinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]

        this.clicked = this.clicked.bind(this);
        this.gameEnd = this.gameEnd.bind(this);
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

        var symbols = this.state.symbols;
        if (!this.state.gameEnd && symbols[cellNo] ==="") {
            symbols[cellNo] = this.state.nextSymbol;

            nextSymbol = this.state.nextSymbol === 'X' ? 'O' : 'X';

            let occupiedCells = this.state.occupiedCells;
            occupiedCells++;

            
            this.setState({symbols, nextSymbol, occupiedCells}, () => {

                if (this.state.occupiedCells === 9) {
                    this.gameEnd("Draw");
                }

                this.combinations.forEach(combination => {
                    let x = 0, o = 0;
                    combination.forEach(position => {
                        symbols[position] === 'X' ? x++ : (symbols[position] === 'O' ? o++ : null);
                    });

                    if (x === 3) {
                        this.gameEnd("X Wins");
                    }
                    else if (o === 3) {
                        this.gameEnd("O Wins");
                    }
                });                
            });


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
            ]).start();

        }
    }

    gameEnd(result) {
        this.setState({infoLabel : result, gameEnd : true, nextSymbol : "",})
        Animated.timing(
            this.state.infoSize,
            {
                toValue : 90,
                duration : 1000,
            }
        ).start()

        Animated.timing(
            this.state.boardOpacity,
            {
                toValue : 0.3,
                duration : 2000,
            }
        ).start()
    }

    render() {
        let { symbolSize } = this.state;
        let { infoSize } = this.state;
        let { boardOpacity } = this.state

        let board = [];
        for (let i = 0; i <= 2; i++) {
            board.push(<Row key={i} id={i} clicked={this.clicked} symbolSize= {symbolSize} symbols= {this.state.symbols} />)
        }
        
        return (
            <View style={styles.container}>

                <Topbar userName={this.state.userName} changeView={this.props.changeView} />
                
                <Animated.View style={[styles.board, {opacity: boardOpacity}]}>
                    {board}
                </Animated.View>

                <View style={[styles.infoSection]}>
                    <View style={{flexDirection: 'row',}}>
                        <Animated.Text style={[{fontSize : infoSize}]}> {this.state.infoLabel} </Animated.Text>
                        <Text style={[{fontSize : 25,}]}> {this.state.nextSymbol} </Text>
                     </View>
                </View>
            </View>
        )
    }
}

export default Board;