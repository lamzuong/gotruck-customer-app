import MyButton from "../../components/MyButton/MyButton";
import styles from "./stylesWelcome";

import { View, Text, StatusBar, Image } from "react-native";
import React from "react";
import Swiper from "react-native-swiper";

export default function Welcome({ navigation }) {
  
  return (
    <View style={styles.container}>
      <StatusBar />
      <Image
        source={require("../../assets/images/logo-name-white.png")}
        style={styles.logoName}
      />
      <Image
        source={require("../../assets/images/logo-truck.png")}
        style={styles.logoTruck}
      />
      <Swiper style={styles.swiper} autoplay={true}>
        <View>
          <Text style={styles.swiper.headerTitle}>
            VIỆC GÌ KHÓ{"\n"}CỨ ĐỂ GOTRUCK LO
          </Text>
          <Text style={styles.swiper.bodyTitle}>
            Nhận hàng tận nơi, giao hàng tận chỗ{"\n"}
            Kết nối mọi lúc mọi nơi
          </Text>
        </View>
        <View>
          <Text style={styles.swiper.headerTitle}>
            NHẬN KẾT NỐI{"\n"}ĐÓNG GÓP CHO XÃ HỘI
          </Text>
          <Text style={styles.swiper.bodyTitle}>
            Trở thành đối tác của GoTruck để cải thiện{"\n"}
            cuộc sống của bạn và hơn thế nữa
          </Text>
        </View>
      </Swiper>
      <View style={styles.frameButton}>
        <MyButton
          type="medium"
          btnColor="white"
          text="ĐĂNG KÝ"
          txtColor="green"
          borderWidth={1}
          borderColor="green"
          action={() => {
            navigation.navigate("SignUp");
          }}
        />
        <MyButton
          type="medium"
          btnColor="black"
          text="ĐĂNG NHẬP"
          txtColor="white"
          action={() => {
            navigation.navigate("Login");
          }}
        />
      </View>
    </View>
  );
}
