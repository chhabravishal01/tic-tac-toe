import React, { Component } from "react";
import { View, Animated, LayoutAnimation, Alert } from "react-native";

import Utils from "./Utils";
import Socket from "./Socket";

import styles from "./Styles";

import Topbar from "./Topbar";
import InviteSection from "./InviteSection";
import Grid from "./Grid";
import InfoSection from "./InfoSection";

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "-",

      symbols: Array(9).fill(""),
      symbolSize: new Animated.Value(90),
      nextSymbol: "X",
      infoLabel: "Next Move :  ",
      infoSize: new Animated.Value(25),
      // gridKey: 1,

      currentMode: "Offline",
      inviteViewHeight: 0,
      opponent: "",
      symbolAssigned: "",
      inviteStatus: "",
      roomId: "",

      occupiedCells: 0,
      gameEnd: false,
      boardOpacity: new Animated.Value(1),

      hLineLength: new Animated.Value(0),
      hLinePosition: new Animated.Value(0),

      vLineLength: new Animated.Value(0),
      vLinePosition: new Animated.Value(0),

      dLineOneLength: new Animated.Value(0),
      dLineTwoLength: new Animated.Value(0),

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

  leaveRoom = () => {
    Socket.sendData("leaveRoom", { roomId: this.state.roomId });
  };

  reloadForOnlineGame = () => {
    this.setState({
      symbols: Array(9).fill(""),
      nextSymbol: "X",
      // gridKey: 1,
      currentMode: "Online",
      inviteViewHeight: 0,
      inviteStatus: "",
      occupiedCells: 0,
      gameEnd: false
    });

    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);

    this.state.infoSize.setValue(25);
    this.state.boardOpacity.setValue(1);
    this.state.hLineLength.setValue(0);
    this.state.vLineLength.setValue(0);
    this.state.dLineOneLength.setValue(0);
    this.state.dLineTwoLength.setValue(0);

    this.state.hLinePosition.setValue(this.state.viewH / 2);
    this.state.vLinePosition.setValue(this.state.viewW / 2);
    Animated.timing(this.state.dLineAngle, {
      toValue: 0
    }).start();
  };

  reload = (proceed = false) => {
    // gridKey = (this.state.gridKey + 1) % 2;
    // this.setState({ gridKey });

    if (
      this.state.currentMode === "Online" &&
      !this.state.gameEnd &&
      !proceed
    ) {
      Alert.alert("Game in progress ", "Leave & refresh", [
        {
          text: "OK",
          onPress: () => {
            this.leaveRoom();
            this.reload(true);
          }
        },
        {
          text: "Cancel"
        }
      ]);
      return;
    }

    this.reloadForOnlineGame();

    this.setState({
      infoLabel: "Next Move :  ",
      currentMode: "Offline",
      symbolAssigned: "",
      roomId: "",
      opponent: ""
    });
  };

  inviteDialog = (inviteViewHeight = null) => {
    if (this.state.currentMode === "Online") {
      return;
    }

    inviteViewHeight =
      inviteViewHeight || this.state.inviteViewHeight === 80 ? 0 : 80;

    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    this.setState({ inviteViewHeight });
  };

  sendInvite = () => {
    let { opponent, userName } = this.state;
    if (opponent === "") {
      this.setState({ inviteStatus: "Enter username" });
      return;
    } else if (opponent === userName) {
      this.setState({ inviteStatus: "That's your username" });
      return;
    }

    Socket.sendData("sendInvite", { from: this.state.userName, to: opponent });
  };

  updateFromServer = (responseType, data) => {
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
        this.reloadForOnlineGame();
        let { nextSymbol, symbolAssigned } = this.state;
        let infoLabel =
          nextSymbol === symbolAssigned ? "Your turn : " : "Opponent's turn : ";
        split = data.roomId.split("-");
        opponent = split[1] === this.state.userName ? split[2] : split[1];
        this.setState({
          roomId: data.roomId,
          opponent,
          infoLabel
        });
      } else {
        this.setState({ inviteStatus: data.message });
      }
    } else if (responseType === "updateBoard") {
      this.clicked(data.cellNo, true);
    } else if (responseType === "symbolAssigned") {
      this.setState({ symbolAssigned: data.symbol });
    } else if (responseType === "leaveRoom") {
      this.reload(true);
      alert("Other player has left the game.");
    }
  };

  clicked = (cellNo, byOpponent = false) => {
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
  };

  gameEnd = (result, iteration = null) => {
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
        Animated.spring(this.state.hLineLength, {
          toValue: this.state.viewW,
          friction: 3
        }).start();
      } else if (iteration <= 5) {
        Animated.spring(this.state.vLinePosition, {
          toValue: (this.state.viewW * (2 * iteration - 5)) / 6,
          friction: 3
        }).start();
        Animated.spring(this.state.vLineLength, {
          toValue: this.state.viewH,
          friction: 3
        }).start();
      } else {
        let length =
          iteration === 6
            ? this.state.dLineOneLength
            : this.state.dLineTwoLength;
        Animated.spring(length, {
          toValue: this.state.viewW * 1.414,
          friction: 3
        }).start();
        Animated.spring(this.state.dLineAngle, {
          toValue: 45,
          friction: 3
        }).start();
      }
    }
  };

  setInitialPosition = elem => {
    this.setState({
      viewW: elem.width,
      viewH: elem.height,
      hLinePosition: new Animated.Value(elem.height / 2),
      vLinePosition: new Animated.Value(elem.width / 2)
    });
  };

  render() {
    let { symbolSize, infoSize, boardOpacity } = this.state;
    let {
      hLinePosition,
      hLineLength,
      vLinePosition,
      vLineLength,
      dLineOneLength,
      dLineTwoLength,
      dLineAngle
    } = this.state;

    dLineAngle = dLineAngle.interpolate({
      inputRange: [0, 45],
      outputRange: ["0deg", "45deg"]
    });

    return (
      <View style={styles.container}>
        <Topbar
          // key={this.state.gridKey}
          userName={this.state.userName}
          changeView={this.props.changeView}
          inviteDialog={this.inviteDialog}
          currentMode={this.state.currentMode}
          opponent={this.state.opponent}
          reload={this.reload}
          leaveRoom={this.leaveRoom}
        />

        <InviteSection
          view={this.state.inviteViewHeight}
          status={this.state.inviteStatus}
          sendInvite={this.sendInvite}
          setOpponent={value => {
            this.setState({ opponent: value });
          }}
        />

        <Grid
          setInitialPosition={this.setInitialPosition}
          boardOpacity={boardOpacity}
          symbolSize={symbolSize}
          symbols={this.state.symbols}
          hLinePosition={hLinePosition}
          hLineLength={hLineLength}
          vLinePosition={vLinePosition}
          vLineLength={vLineLength}
          dLineOneLength={dLineOneLength}
          dLineTwoLength={dLineTwoLength}
          dLineAngle={dLineAngle}
          clicked={this.clicked}
        />

        <InfoSection
          infoSize={infoSize}
          infoLabel={this.state.infoLabel}
          nextSymbol={this.state.nextSymbol}
        />
      </View>
    );
  }
}

export default Board;
