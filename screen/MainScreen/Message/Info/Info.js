import styles from "./stylesInfo";
import stylesGlobal from "../../../../global/stylesGlobal";

import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons, Octicons, FontAwesome } from "@expo/vector-icons";
import ReadMore from "react-native-read-more-text";

const mess = [
  {
    id: "1",
    name: "Mở tiệc tùng mừng năm mới",
    message: {
      content:
        "Ngày cuối năm GoTruck xin tặng bạn voucher giảm 10% nếu vận chuyển trên 2.000.000 đ\n thuận tiện cho việc vận chuyển tổ chức trong dịp tất niên này trong các hoạt động ngoài trời đáng mong đợi các bạn nhé!!",
      image: [
        "https://upload.motgame.vn/photos/motgame-vn/2022/05/Spy-x-family-Anya_3.jpg",
        "https://observatoriodocinema.uol.com.br/wp-content/uploads/2022/07/Spy-x-Family-anya.jpg",
      ],
      read: true,
    },
    time: "22m",
    type: "Advertise",
  },
  {
    id: "2",
    name: "Tài xế xe 43-2K.12324 đã nhận đơn hàng HD20230012 của bạn",
    message: {
      content:
        "Đơn hàng HD20230012 của bạn đã được nhận bởi tài xế xe 43-2K.12324. Vui lòng giữ máy để được shipper liên lạc trao đổi thông tin! Cám ơn quý khách rất nhiều",
      image: [],
      read: false,
    },
    time: "22m",
    type: "Order",
  },
  {
    id: "3",
    name: "Mở tất niên, khao deal cuối năm 2023",
    message: {
      content:
        "Ngày cuối năm GoTruck xin tặng bạn voucher giảm 10% nếu vận chuyển trên 2.000.000 đ thuận tiện cho việc vận chuyển tổ chức trong dịp tất niên này trong các hoạt động ngoài trời đáng mong đợi các bạn nhé!!",
      image: [
        "https://upload.motgame.vn/photos/motgame-vn/2022/05/Spy-x-family-Anya_3.jpg",
        "https://observatoriodocinema.uol.com.br/wp-content/uploads/2022/07/Spy-x-Family-anya.jpg",
      ],
      read: true,
    },
    time: "22m",
    type: "Advertise",
  },
];
export default function Info({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={mess}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={styles.itemChat}
              onPress={() => {
                navigation.navigate("InfoDetail", { item: item });
              }}
            >
              <View
                style={
                  item.type === "Advertise"
                    ? styles.itemChat.deal
                    : styles.itemChat.order
                }
              >
                {item.type === "Advertise" ? (
                  <Ionicons
                    name="md-pricetags"
                    size={24}
                    color={stylesGlobal.darkOrange}
                  />
                ) : (
                  <FontAwesome
                    name="truck"
                    size={24}
                    color={stylesGlobal.darkGreen}
                  />
                )}
              </View>

              <View style={styles.itemChat.rightItem}>
                <ReadMore
                  numberOfLines={1}
                  renderTruncatedFooter={() => null}
                  renderRevealedFooter={() => null}
                >
                  <Text
                    style={
                      item.message.read
                        ? styles.itemChat.name.read
                        : styles.itemChat.name.unread
                    }
                  >
                    {item.name}
                  </Text>
                </ReadMore>
                <View style={styles.itemChat.viewMessage}>
                  <View style={{ width: "80%" }}>
                    <ReadMore
                      numberOfLines={1}
                      renderTruncatedFooter={() => null}
                      renderRevealedFooter={() => null}
                    >
                      <Text
                        style={[
                          item.message.read
                            ? styles.itemChat.viewMessage.read
                            : styles.itemChat.viewMessage.unread,
                          styles.itemChat.viewMessage.message,
                        ]}
                      >
                        {item.message.content}{" "}
                      </Text>
                    </ReadMore>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={[
                        item.message.read
                          ? styles.itemChat.viewMessage.read
                          : styles.itemChat.viewMessage.unread,
                        styles.itemChat.viewMessage.time,
                      ]}
                    >
                      {item.time}{" "}
                    </Text>
                    {item.message.read ? null : (
                      <Octicons name="dot-fill" size={24} color="blue" />
                    )}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => "#" + index}
        key={"#"}
      />
    </View>
  );
}
