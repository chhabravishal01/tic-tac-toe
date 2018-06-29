import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from "react-native";

import Utils from "./Utils.js";

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
      <View style={{ alignItems: "center" }}>
        <View style={styles.container}>
          <Text style={styles.header}>SignUp</Text>

          <View style={styles.credentialsContainer}>
            <TextInput
              style={styles.input}
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="User Name"
              placeholderTextColor="#999"
              onChangeText={value => this.setState({ userName: value })}
            />
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Password"
              placeholderTextColor="#999"
              onChangeText={value => this.setState({ password: value })}
            />
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Reenter Password"
              placeholderTextColor="#999"
              onChangeText={value => this.setState({ verifyPassword: value })}
            />
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.button} onPress={this.signUp}>
              <Text style={{ color: "blue" }}> SignUp </Text>
            </TouchableOpacity>
            <Text style={styles.error}> {this.state.error} </Text>
          </View>
        </View>

        <View style={{}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.changeView("login");
            }}
          >
            <Text style={{ color: "blue" }}> Login </Text>
          </TouchableOpacity>
        </View>
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
    paddingTop: 70,
    //   backgroundColor: '#eee',
    // height: 650,
    flex: -1
  },

  actions: {
    alignItems: "center"
  },

  credentialsContainer: {
    width: 300,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 20,
    padding: 30
  },

  header: {
    fontSize: 30,
    marginBottom: 30
  },

  input: {
    margin: 10,
    width: 250,
    fontSize: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#eee"
    //   borderWidth: 1,
  },

  button: {
    width: 300,
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 10,
    alignItems: "center",
    margin: 30,
    padding: 10
  },

  error: {
    marginTop: 10,
    color: "red"
  }
});
