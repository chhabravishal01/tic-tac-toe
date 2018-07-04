import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  LayoutAnimation
} from "react-native";

import { Item, Input, Button, Icon } from "native-base";

const { height } = Dimensions.get("screen");

import Utils from "./Utils.js";
import { baseColor, materialRed } from "./Styles.js";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      password: "",
      verifyPassword: "",
      error: ""
    };

    this.signUp = this.signUp.bind(this);
  }

  signUp() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    if (this.state.userName === "") {
      this.setState({ error: "User Name is required" });
      return;
    } else if (this.state.password === "") {
      this.setState({ error: "Password is required" });
      return;
    } else if (this.state.password !== this.state.verifyPassword) {
      this.setState({ error: "Passwords don't match" });
      return;
    }

    Utils.signUp(this.state.userName, this.state.password).then(res => {
      if (res.error === 1) {
        this.setState({ error: res.message });
      } else {
        Utils.setToken(res.token);
        this.props.changeView("board");
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          style={{ top: 40, position: "absolute" }}
          transparent
          onPress={() => {
            this.props.changeView("login");
          }}
        >
          <Icon name="arrow-back" style={{ fontSize: 30, color: "white" }} />
        </Button>

        <View style={styles.icon}>
          <Image source={require("../resources/icon.png")} />
        </View>

        <View style={styles.credentialsContainer}>
          <Item rounded style={styles.input}>
            <Input
              underlineColorAndroid="transparent"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="User Name"
              placeholderTextColor="#999"
              onChangeText={value => this.setState({ userName: value })}
            />
          </Item>

          <Item rounded style={styles.input}>
            <Input
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Password"
              placeholderTextColor="#999"
              onChangeText={value => this.setState({ password: value })}
            />
          </Item>
          <Item floatingLabel rounded style={styles.input}>
            <Input
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Verify Password"
              placeholderTextColor="#999"
              onChangeText={value => this.setState({ verifyPassword: value })}
            />
          </Item>
        </View>

        {this.state.error.length > 0 && (
          <View style={styles.errorBox}>
            <Text style={styles.error}>
              ERROR: {this.state.error.toUpperCase()}
            </Text>
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={this.signUp}>
          <Text style={{ color: baseColor, fontSize: 20 }}> SignUp </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: baseColor,
    height
  },

  icon: {
    margin: 80,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 12,
    height: 128,
    width: 128,
    borderRadius: 64
  },

  credentialsContainer: {
    alignItems: "center",
    alignSelf: "stretch",
    borderColor: "grey",
    paddingHorizontal: 16
  },

  input: {
    marginVertical: 10,
    height: 45,
    paddingHorizontal: 15,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 12
  },

  label: { marginLeft: 30, marginTop: 3, fontSize: 16 },

  button: {
    height: 40,
    alignSelf: "stretch",
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    margin: 16,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 12
  },

  errorBox: {
    height: 40,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: materialRed,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 12,
    borderWidth: 0.5,
    borderColor: "#fff"
  },

  error: {
    // color: "#fff",
    color: materialRed,
    letterSpacing: 2
  }
});
