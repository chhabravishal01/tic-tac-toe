import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ddd",
    alignItems: "center",
    flex: 1
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    // flex-start, center, flex-end, space-around, space-between and space-evenly

    alignItems: "flex-end",
    // flex-start, center, flex-end, and stretch.

    backgroundColor: "#aaa",
    // borderRadius : 5,
    paddingBottom: 10,

    alignSelf: "stretch",
    // auto, flex-start, flex-end, center, stretch, baseline
    flex: 1
  },

  user: {
    paddingLeft: 30,
    fontSize: 25
  },

  logout: {
    color: "blue",
    paddingRight: 30,
    fontSize: 20
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

  board: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'blue',
    // margin : 20,
    // padding : 10,
    marginTop: 50,
    aspectRatio: 1
  },

  line: {
    backgroundColor: "black",
    position: "absolute"
  },

  infoSection: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center"
  },

  row: {
    flexDirection: "row",
    aspectRatio: 3
    // flex : 1,
  },

  cellOdd: {
    // flex : 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    aspectRatio: 1
  },

  cellEven: {
    // flex : 1,
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 1
  },

  error: {
    marginTop: 10,
    color: "red"
  }
});

export default styles;
