import styles from "./stylesChat";

import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Octicons } from "@expo/vector-icons";
import ReadMore from "react-native-read-more-text";

const mess = [
  {
    id: "1",
    ava: "https://i.pinimg.com/736x/18/b7/c8/18b7c8278caef0e29e6ec1c01bade8f2.jpg",
    name: "Tài xế xe 53-2F.45613",
    message: {
      content: "gutbcxzcxzcxxczxc  zxczxc  zczxczxczxoiz",
      read: true,
    },
    time: "22m",
  },
  {
    id: "2",
    ava: "https://i.pinimg.com/736x/6d/cd/c7/6dcdc7081a209999450d6abe0b3d84a7.jpg",
    name: "Tài xế xe 53-2F.45613",
    message: {
      content: "facboi",
      read: false,
    },
    time: "22m",
  },
  {
    id: "3",
    ava: "https://i.pinimg.com/736x/92/ff/1a/92ff1ac6f54786b4baeca8412934a7ca.jpg",
    name: "Tài xế xe 53-2F.45613",
    message: {
      content: "ka xy",
      read: true,
    },
    time: "22m",
  },
];
export default function Chat({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={mess}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={styles.itemChat}
              onPress={() => {
                navigation.navigate("ChatRoom", { item: item });
              }}
            >
              <Image
                source={{
                  uri: item.ava,
                }}
                style={styles.itemChat.avatar}
              />
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
        keyExtractor={(item, index) => "@" + index}
        key={"@"}
      />
    </View>
  );
}
