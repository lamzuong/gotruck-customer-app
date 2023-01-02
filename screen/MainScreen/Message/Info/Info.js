import styles from "./stylesInfo";
import stylesGlobal from "../../../../global/stylesGlobal";

import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons, Octicons } from "@expo/vector-icons";
import ReadMore from "react-native-read-more-text";

const mess = [
  {
    id: "1",
    name: "Mở tiệc tùng mừng năm mới",
    message: {
      content: "gutboiz",
      read: true,
    },
    time: "22m",
  },
  {
    id: "2",
    name: "Tiếp mồi cỗ vũ đội nhà",
    message: {
      content: "facboivzcxvvvvvvvvvv facboivzcxvvvvvvvvvv",
      read: false,
    },
    time: "22m",
  },
  {
    id: "3",
    name: "Mở tất niên, khao deal cuối năm",
    message: {
      content: "ka xy",
      read: true,
    },
    time: "22m",
  },
];
export default function Info({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={mess}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity style={styles.itemChat} key={index + "#"}>
              <View style={styles.itemChat.avatar}>
                <Ionicons
                  name="md-pricetags"
                  size={24}
                  color={stylesGlobal.darkOrange}
                />
              </View>

              <View style={styles.itemChat.rightItem}>
                <Text
                  style={
                    item.message.read
                      ? styles.itemChat.name.read
                      : styles.itemChat.name.unread
                  }
                >
                  {item.name}
                </Text>
                <View style={styles.itemChat.viewMessage}>
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
