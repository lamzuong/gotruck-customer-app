import styles from "./stylesHome";
import stylesGlobal from "../../../global/stylesGlobal";
import MyInput from "../../../components/MyInput/MyInput";
import MyButton from "../../../components/MyButton/MyButton";

import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

export default function Home({ navigation }) {
  const listImg = [
    "https://cdn.popsww.com/blog/sites/2/2022/09/cac-tap-phim-dac-biet-cua-one-piece.jpg",
    "https://static-images.vnncdn.net/files/publish/2022/11/12/1iiiiiiiiiii-926.png",
    "https://image.thanhnien.vn/1200x630/Uploaded/2023/ecfzyrrtlyr/2017_04_09/one-piece-dai-chien2_nbwb.jpg",
  ];
  return (
    <View style={styles.container}>
      <StatusBar />
      <ImageBackground
        source={require("../../../assets/images/morning.jpg")}
        style={styles.bgImg}
        resizeMode={"cover"}
      >
        <View style={{ marginBottom: 50, marginLeft: 30 }}>
          <Text style={{ fontSize: 22, fontWeight: "bold", color: "white" }}>
            Chào buổi sáng, Lâm !!
          </Text>
        </View>

        <View style={{ marginBottom: 30, marginHorizontal: 30 }}>
          <MyInput
            placeholder={"Tìm kiếm"}
            iconLeft={<AntDesign name="search1" size={24} color="black" />}
            border={true}
            borderColor={"grey"}
          />
        </View>
      </ImageBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        {listImg.map((e, i) => (
          <Image source={{ uri: e }} style={styles.imgAdvertise} key={i} />
        ))}
      </ScrollView>
      <View style={{ marginVertical: 10 }}>
        <MyButton
          type={"large"}
          text="Lên đơn"
          btnColor={stylesGlobal.mainGreen}
          txtColor={"white"}
          iconRight={
            <MaterialCommunityIcons name="truck-fast" size={24} color="white" />
          }
          action={() => navigation.navigate("NewOrder")}
        />
      </View>
    </View>
  );
}
