import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#ddd',
      flex : 1,
    },

    topBar: {
        flexDirection: 'row',
        justifyContent: "space-between",
        // flex-start, center, flex-end, space-around, space-between and space-evenly

        alignItems: 'flex-end',
        // flex-start, center, flex-end, and stretch.

        backgroundColor: "#aaa",
        // borderRadius : 5,
        paddingBottom : 10,

        // alignSelf: 'stretch',
        // auto, flex-start, flex-end, center, stretch, baseline
        flex : 1,
    },

    user : {
        paddingLeft : 30,
        fontSize : 25,
    },

    logout: {
        color: 'blue',
        paddingRight : 30,
        fontSize: 20,
    },

    board : {
        flex: 5,
        // backgroundColor: 'blue',
        margin : 20,
        marginTop : 50,
    },

    infoSection : {
        flex : 4,
        // paddingTop : 100,
        justifyContent : 'center',
        alignItems : 'center',
    },

    row : {
        flexDirection : 'row',
        flex : 1,
    },

    // cell : {
    //     flex : 1,
    //     justifyContent : 'center',
    //     alignItems : 'center',
    // },

    cellOdd : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : '#eee',
    },

    cellEven : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },

    error: {
        marginTop: 10,
        color: 'red',
    }
  });

  export default styles;