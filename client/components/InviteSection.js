import React, { Component } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Animated
} from "react-native";

class InviteSection extends Component {
  render() {
    return (
      <Animated.View
        style={{
          // display: this.props.view,
          height: this.props.view,
          overflow: "hidden",
          alignItems: "center",
          alignSelf: "stretch"
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            style={{
              margin: 10,
              fontSize: 20,
              padding: 10,
              borderRadius: 20,
              backgroundColor: "white",
              flex: 1
            }}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Enter Opponent Username"
            placeholderTextColor="#999"
            onChangeText={value => {
              this.props.setOpponent(value);
            }}
          />

          <TouchableOpacity
            onPress={() => {
              this.props.sendInvite();
            }}
          >
            <Text style={{ paddingRight: 10, fontSize: 20, flex: -1 }}>
              Invite
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text> {this.props.status} </Text>
        </View>
      </Animated.View>
    );
  }
}

export default InviteSection;
