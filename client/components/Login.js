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

import { Item, Input } from "native-base";

const { height } = Dimensions.get("screen");

import Utils from "./Utils.js";
import { baseColor, materialRed } from "./Styles.js";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      password: "",
      error: ""
    };

    this.login = this.login.bind(this);
  }

  login() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    if (this.state.userName === "") {
      this.setState({ error: "User Name is required" });
      return;
    } else if (this.state.password === "") {
      this.setState({ error: "Password is required" });
      return;
    }

    Utils.login(this.state.userName, this.state.password).then(res => {
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
      <View>
        <View style={styles.container}>
          <View style={styles.icon}>
            <Image source={require("../resources/icon.png")} />
          </View>

          <View style={styles.credentialsContainer}>
            <Item rounded style={styles.input}>
              <Input
                underlineColorAndroid="transparent"
                autoCorrect={false}
                autoCapitalize="none"
                placeholder={"User Name"}
                placeholderTextColor="#999"
                onChangeText={value => this.setState({ userName: value })}
              />
            </Item>

            <Item rounded style={styles.input}>
              <Input
                secureTextEntry={true}
                underlineColorAndroid="transparent"
                autoCorrect={false}
                placeholder="Password"
                autoCapitalize="none"
                placeholderTextColor="#999"
                onChangeText={value => this.setState({ password: value })}
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

          <TouchableOpacity style={styles.button} onPress={this.login}>
            <Text style={{ color: baseColor, fontSize: 20 }}> Login </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => {
              this.props.changeView("signUp");
            }}
          >
            <Text style={{ color: "white", fontSize: 20 }}> SignUp </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    //   backgroundColor: '#eee',
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
    alignSelf: "stretch",
    paddingHorizontal: 16,
    alignItems: "center",
    borderColor: "grey"
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

  secondaryButton: {
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "center",
    margin: 16,
    borderColor: "#fff",
    borderWidth: 0.5,
    height: 40,
    borderRadius: 20,
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
