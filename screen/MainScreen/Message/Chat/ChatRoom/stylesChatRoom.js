import { Dimensions, StyleSheet } from "react-native";
import stylesGlobal from "../../../../../global/stylesGlobal";

const stylesGeneral = StyleSheet.create({
  viewMessage: {
    justifyContent: "center",
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    minHeight: 40,
    maxWidth: 200,
  },
  textTime: {
    marginTop: -8,
    marginLeft: 55,
    color: "grey",
  },
});
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 55,
    paddingHorizontal: 18,
    backgroundColor: stylesGlobal.mainGreen,

    txtHeader: {
      color: "white",
      fontWeight: "bold",
      fontSize: 18,
    },
  },
  //=======================
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  itemChat: {
    flexDirection: "row",
    marginBottom: 10,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 100,
  },
  view: {
    owner: {
      ...StyleSheet.compose(stylesGeneral.viewMessage),
      backgroundColor: stylesGlobal.mainGreen,
    },
    shipper: {
      ...StyleSheet.compose(stylesGeneral.viewMessage),
      backgroundColor: stylesGlobal.lightDarkGrey,
    },
  },
  text: {
    owner: {
      fontSize: 17,
      color: "white",
    },
    shipper: {
      fontSize: 17,
    },
  },
  time: {
    owner: {
      ...StyleSheet.compose(stylesGeneral.textTime),
      textAlign: "right",
      marginRight: 15,
    },
    shipper: {
      ...StyleSheet.compose(stylesGeneral.textTime),
    },
  },

  //=====Input==========
  viewInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: stylesGlobal.darkGrey,
  },
  input: {
    width: "88%",
    height: 40,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: stylesGlobal.mainGreen,
  },
  txtInput: {
    fontSize: 17,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  iconSend: {
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
  },
});

export default styles;
