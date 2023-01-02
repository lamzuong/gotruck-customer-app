import { Dimensions, StyleSheet } from "react-native";
import stylesGlobal from "../../../../global/stylesGlobal";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  itemChat: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: stylesGlobal.lightDarkGrey,

    avatar: {
      width: 50,
      height: 50,
      borderRadius: 100,
      backgroundColor: stylesGlobal.lightOrange,
      alignItems: "center",
      justifyContent: "center",
    },
    rightItem: {
      width: "80%",
      marginLeft: 15,
    },
    name: {
      read: {
        fontSize: 20,
      },
      unread: {
        fontSize: 20,
        fontWeight: "bold",
      },
    },
    viewMessage: {
      flexDirection: "row",
      justifyContent: "space-between",

      message: {
        fontSize: 18,
      },
      time: {
        fontSize: 16,
      },

      read: {
        color: "grey",
      },
      unread: {
        fontWeight: "bold",
      },
    },
  },
});

export default styles;
