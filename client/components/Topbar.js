import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";

import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Subtitle
} from "native-base";

import styles from "./Styles.js";

class Topbar extends Component {
  render() {
    if (this.props.currentMode === "Online") {
      header = this.props.opponent;
    } else header = this.props.currentMode;

    return (
      <Container style={[styles.topBar]}>
        <Header>
          <Left>
            <Text onPress={() => this.props.reload()} style={styles.user}>
              {this.props.userName}
            </Text>
          </Left>
          <Body>
            <Title>
              <Text
                style={styles.user}
                onPress={() => {
                  this.props.inviteDialog();
                }}
              >
                {header}
              </Text>
            </Title>
            {this.props.currentMode === "Online" && (
              <Subtitle>Opponent</Subtitle>
            )}
          </Body>
          <Right>
            <TouchableOpacity
              onPress={() => {
                this.props.leaveRoom();
                this.props.changeView("login");
              }}
            >
              <Text style={styles.logout}>
                <Icon name="log-out" style={{ fontSize: 30, color: "black" }} />
              </Text>
            </TouchableOpacity>
          </Right>
        </Header>
        {/* 
        <Text onPress={() => this.props.reload()} style={styles.user}>
          {this.props.userName}
        </Text>
        <Text
          style={styles.user}
          onPress={() => {
            this.props.inviteDialog();
          }}
        >
          {currentMode}
        </Text>
        <TouchableOpacity
          onPress={() => {
            this.props.leaveRoom();
            this.props.changeView("login");
          }}
        >
          <Text style={styles.logout}> Logout </Text>
        </TouchableOpacity> */}
      </Container>
    );
  }
}

export default Topbar;
