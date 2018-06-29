import React, { Component } from "react";
import {
  Text,
  TextInput,
  View,
  Animated,
  TouchableOpacity,
  LayoutAnimation,
  Alert
} from "react-native";

import Utils from "./Utils.js";
import Socket from "./Socket.js";

import styles from "./Styles.js";

import Topbar from "./Topbar.js";
import Row from "./Row.js";

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userDetails: "",
      userName: "-",
      symbols: Array(9).fill(""),
      symbolSize: new Animated.Value(90),
      nextSymbol: "X",
      symbolAssigned: "",
      onlineGameInfo: "",
      infoLabel: "Next Move :  ",
      infoSize: new Animated.Value(25),

      currentMode: "Offline",
      inviteView: "none",
      opponent: "",
      inviteStatus: "",

      occupiedCells: 0,
      gameEnd: false,
      boardOpacity: new Animated.Value(1),

      hLineWidth: new Animated.Value(0),
      hLinePosition: new Animated.Value(0),

      vLineHeight: new Animated.Value(0),
      vLinePosition: new Animated.Value(0),

      dLineOneHeight: new Animated.Value(0),
      dLineTwoHeight: new Animated.Value(0),

      dLinePosition: new Animated.Value(0),
      dLineAngle: new Animated.Value(0),

      viewW: 0,
      viewH: 0
    };

    this.combinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    this.clicked = this.clicked.bind(this);
    this.gameEnd = this.gameEnd.bind(this);
    this.inviteDialog = this.inviteDialog.bind(this);
    this.updateFromServer = this.updateFromServer.bind(this);
  }

  componentDidMount() {
    Utils.checkToken().then(token => {
      if (token) {
        let userDetails = Utils.getUserDetails(token);
        this.setState({ userName: userDetails.userName }, () => {
          Socket.initiate(this.state.userName, this.updateFromServer);
        });
      }
    });
  }

  inviteDialog(inviteView = null) {
    inviteView =
      inviteView || this.state.inviteView === "flex" ? "none" : "flex";

    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    this.setState({ inviteView });
  }

  sendInvite() {
    let { opponent, userName } = this.state;
    if (opponent === "") {
      this.setState({ inviteStatus: "Enter username" });
      return;
    } else if (opponent === userName) {
      this.setState({ inviteStatus: "That's your username" });
      return;
    }

    Socket.sendData("sendInvite", { from: this.state.userName, to: opponent });
  }

  updateFromServer(responseType, data) {
    if (responseType === "inviteReceived") {
      Alert.alert("Invite received from " + data.from, "", [
        {
          text: "Accept",
          onPress: () => {
            Socket.sendData("accept", { roomId: data.roomId });
          }
        },
        {
          text: "Decline",
          onPress: () => {
            Socket.sendData("decline", { roomId: data.roomId });
          }
        }
      ]);
    } else if (responseType === "acknowledgement") {
      this.setState({ inviteStatus: data.message });
    } else if (responseType === "inviteResponse") {
      if (data.status === "accepted") {
        this.inviteDialog("none");
        let { nextSymbol, symbolAssigned } = this.state;
        let infoLabel =
          nextSymbol === symbolAssigned ? "Your turn : " : "Opponent's turn : ";
        this.setState({
          currentMode: "Online",
          inviteStatus: "",
          roomId: data.roomId,
          infoLabel
        });
      } else {
        this.setState({ inviteStatus: data.message });
      }
    } else if (responseType === "updateBoard") {
      this.clicked(data.cellNo, true);
    } else if (responseType === "symbolAssigned") {
      this.setState({ symbolAssigned: data.symbol });
    }
  }

  clicked(cellNo, byOpponent = false) {
    let { symbols, nextSymbol, symbolAssigned, currentMode } = this.state;
    if (
      !this.state.gameEnd &&
      symbols[cellNo] === "" &&
      (currentMode === "Offline" || nextSymbol === symbolAssigned || byOpponent)
    ) {
      symbols[cellNo] = this.state.nextSymbol;

      nextSymbol = this.state.nextSymbol === "X" ? "O" : "X";

      let occupiedCells = this.state.occupiedCells;
      occupiedCells++;

      this.setState({ symbols, nextSymbol, occupiedCells }, () => {
        if (this.state.currentMode === "Online") {
          Socket.sendData("updateBoard", {
            roomId: this.state.roomId,
            cellNo: cellNo
          });
          let infoLabel = byOpponent ? "Your turn : " : "Opponent's turn : ";
          this.setState({ infoLabel });
        }

        if (this.state.occupiedCells === 9) {
          this.gameEnd("Draw");
        }

        let iteration = 0;

        this.combinations.forEach(combination => {
          let x = 0,
            o = 0;
          combination.forEach(position => {
            symbols[position] === "X"
              ? x++
              : symbols[position] === "O"
                ? o++
                : null;
          });

          if (x === 3) {
            this.gameEnd("X Wins", iteration);
          } else if (o === 3) {
            this.gameEnd("O Wins", iteration);
          }
          iteration++;
        });
      });

      Animated.sequence([
        Animated.timing(this.state.symbolSize, {
          toValue: 70,
          duration: 100
        }),
        Animated.spring(this.state.symbolSize, {
          toValue: 90,
          friction: 2
        })
      ]).start();
    }
  }

  gameEnd(result, iteration = null) {
    if (this.state.currentMode === "Online" && iteration) {
      result =
        this.state.nextSymbol === this.state.symbolAssigned
          ? "You Lose"
          : "You Won";
    }
    this.setState({ infoLabel: result, gameEnd: true, nextSymbol: "" });
    Animated.timing(this.state.infoSize, {
      toValue: 90,
      duration: 1000
    }).start();

    Animated.timing(this.state.boardOpacity, {
      toValue: 0.3,
      duration: 2000
    }).start();

    if (iteration !== null) {
      if (iteration <= 2) {
        Animated.spring(this.state.hLinePosition, {
          toValue: (this.state.viewH * (iteration * 2 + 1)) / 6,
          friction: 3
        }).start();
        Animated.spring(this.state.hLineWidth, {
          toValue: this.state.viewW,
          friction: 3
        }).start();
      } else if (iteration <= 5) {
        Animated.spring(this.state.vLinePosition, {
          toValue: (this.state.viewW * (2 * iteration - 5)) / 6,
          friction: 3
        }).start();
        Animated.spring(this.state.vLineHeight, {
          toValue: this.state.viewH,
          friction: 3
        }).start();
      } else {
        let height =
          iteration === 6
            ? this.state.dLineOneHeight
            : this.state.dLineTwoHeight;
        Animated.spring(height, {
          toValue: this.state.viewW * 1.414,
          friction: 3
        }).start();
        Animated.spring(this.state.dLineAngle, {
          toValue: 45,
          friction: 3
        }).start();
      }
    }
  }

  setPosition(elem) {
    this.setState({
      viewW: elem.width,
      viewH: elem.height,
      hLinePosition: new Animated.Value(elem.height / 2),
      vLinePosition: new Animated.Value(elem.width / 2),
      dLinePosition: new Animated.Value(elem.width / 2)
    });
  }

  render() {
    let { symbolSize, infoSize, boardOpacity } = this.state;
    let {
      hLinePosition,
      hLineWidth,
      vLinePosition,
      vLineHeight,
      dLineOneHeight,
      dLineTwoHeight,
      dLinePosition,
      dLineAngle
    } = this.state;

    let dLineOneAngle = dLineAngle.interpolate({
      inputRange: [0, 45],
      outputRange: ["0deg", "-45deg"]
    });
    let dLineTwoAngle = dLineAngle.interpolate({
      inputRange: [0, 45],
      outputRange: ["0deg", "45deg"]
    });

    let board = [];
    for (let i = 0; i <= 2; i++) {
      board.push(
        <Row
          key={i}
          id={i}
          clicked={this.clicked}
          symbolSize={symbolSize}
          symbols={this.state.symbols}
        />
      );
    }

    return (
      <View style={styles.container}>
        <Topbar
          userName={this.state.userName}
          changeView={this.props.changeView}
          inviteDialog={this.inviteDialog}
          currentMode={this.state.currentMode}
        />

        <View
          style={{
            display: this.state.inviteView,
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
                borderRadius: 10,
                backgroundColor: "#eee",
                flex: 1
              }}
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Enter Opponent Username"
              placeholderTextColor="#999"
              onChangeText={value => {
                this.setState({ opponent: value });
              }}
            />

            <TouchableOpacity
              onPress={() => {
                this.sendInvite();
              }}
            >
              <Text style={{ paddingRight: 10, fontSize: 20, flex: -1 }}>
                Invite
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text> {this.state.inviteStatus} </Text>
          </View>
        </View>

        <Animated.View
          onLayout={e => {
            this.setPosition(e.nativeEvent.layout);
          }}
          style={[styles.board, { opacity: boardOpacity }]}
        >
          {board}
          {/* Horizontal line */}
          <Animated.View
            style={[
              { top: hLinePosition, height: 2, width: hLineWidth },
              styles.line
            ]}
          />
          {/* Vertical line */}
          <Animated.View
            style={[
              { left: vLinePosition, height: vLineHeight, width: 2 },
              styles.line
            ]}
          />
          {/* Diagonal line 1 */}
          <Animated.View
            style={[
              {
                left: dLinePosition,
                height: dLineOneHeight,
                width: 2,
                transform: [{ rotate: dLineOneAngle }]
              },
              styles.line
            ]}
          />
          {/* Diagonal line 2 */}
          <Animated.View
            style={[
              {
                left: dLinePosition,
                height: dLineTwoHeight,
                width: 2,
                transform: [{ rotate: dLineTwoAngle }]
              },
              styles.line
            ]}
          />
        </Animated.View>

        <View style={[styles.infoSection]}>
          <View style={{ flexDirection: "row" }}>
            <Text> {this.state.onlineGameInfo} </Text>
            <Animated.Text style={[{ fontSize: infoSize }]}>
              {this.state.infoLabel}
            </Animated.Text>
            <Text style={[{ fontSize: 25 }]}> {this.state.nextSymbol} </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Board;
