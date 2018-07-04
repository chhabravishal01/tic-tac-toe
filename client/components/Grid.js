import React, { Component } from "react";
import { Animated } from "react-native";
import Row from "./Row";
import styles from "./Styles.js";

class Grid extends Component {
  constructor() {
    super();
    this.state = {
      rendered: 0
    };
  }
  render() {
    let board = [];
    for (let i = 0; i <= 2; i++) {
      board.push(
        <Row
          key={i}
          id={i}
          clicked={this.props.clicked}
          symbolSize={this.props.symbolSize}
          symbols={this.props.symbols}
        />
      );
    }
    return (
      <Animated.View
        onLayout={e => {
          if (!this.state.rendered) {
            this.props.setInitialPosition(e.nativeEvent.layout);
            this.setState({ rendered: 1 });
          }
        }}
        style={[styles.board, { opacity: this.props.boardOpacity }]}
      >
        {board}

        {/* Horizontal line */}
        <Animated.View
          style={[
            {
              top: this.props.hLinePosition,
              height: 2,
              width: this.props.hLineLength
            },
            styles.line
          ]}
        />

        {/* Vertical line */}
        <Animated.View
          style={[
            {
              left: this.props.vLinePosition,
              height: this.props.vLineLength,
              width: 2
            },
            styles.line
          ]}
        />

        {/* Diagonal line 1 (Horizontal aligned) */}
        <Animated.View
          style={[
            {
              height: 2,
              width: this.props.dLineOneLength,
              transform: [{ rotate: this.props.dLineAngle }]
            },
            styles.line
          ]}
        />

        {/* Diagonal line 2 (Vertical aligned) */}
        <Animated.View
          style={[
            {
              height: this.props.dLineTwoLength,
              width: 2,
              transform: [{ rotate: this.props.dLineAngle }]
            },
            styles.line
          ]}
        />
      </Animated.View>
    );
  }
}

export default Grid;
