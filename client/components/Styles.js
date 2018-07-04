import { StyleSheet } from "react-native";

export const baseColor = "#27AADE";
export const materialRed = "#E53935";
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ddd",
    backgroundColor: "#27AADE11",
    alignItems: "center",
    flex: 1
  },

  topBar: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    // flex-start, center, flex-end, space-around, space-between and space-evenly

    // alignItems: "flex-end",
    // flex-start, center, flex-end, and stretch.

    // backgroundColor: "#aaa",
    backgroundColor: baseColor,
    // borderRadius : 5,
    // borderWidth: 1,
    // paddingBottom: 10,
    marginBottom: 20,

    alignSelf: "stretch",
    // auto, flex-start, flex-end, center, stretch, baseline
    flex: 1
  },

  user: {
    paddingLeft: 10,
    fontSize: 25
    // color: "white"
  },

  logout: {
    color: "blue",
    // paddingRight: 30,
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
    // backgroundColor: "#eee",
    // backgroundColor: "#27AADE55",
    backgroundColor: "#77777733",
    aspectRatio: 1
  },

  cellEven: {
    // flex : 1,
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 1,
    backgroundColor: "white"
    // backgroundColor: "#777777"
  },

  error: {
    marginTop: 10,
    color: "red"
  }
});

export default styles;
