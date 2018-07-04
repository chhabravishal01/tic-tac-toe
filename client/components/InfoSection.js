import React, { Component } from "react";
import { Text, View, Animated } from "react-native";
import styles from "./Styles";

class InfoSection extends Component {
  render() {
    return (
      <View style={[styles.infoSection]}>
        <View style={{ flexDirection: "row" }}>
          <Animated.Text style={[{ fontSize: this.props.infoSize }]}>
            {this.props.infoLabel}
          </Animated.Text>
          <Text style={[{ fontSize: 25 }]}> {this.props.nextSymbol} </Text>
        </View>
      </View>
    );
  }
}

export default InfoSection;
