import styles from "./stylesChatRoom";
import stylesGlobal from "../../../../../global/stylesGlobal";

import { View, Text, FlatList, Image, TextInput } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ChatRoom({ route }) {
  const { item } = route.params;
  const navigation = useNavigation();
  const id = 1;
  const exMess = [
    {
      id: 1,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIao-KaLLXnLaeTnqXgGBFSAzBgeQgr0g1uA&usqp=CAU",
      content:
        "Chào anh, có phải anh đặt GoTruck giao hàng tới đường Nguyễn Văn Bảo không ạ?",
      idSender: 2,
      time: "10 phút trước",
    },
    {
      id: 2,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIao-KaLLXnLaeTnqXgGBFSAzBgeQgr0g1uA&usqp=CAU",
      content: "Đúng rồi",
      idSender: 1,
      time: "10 phút trước",
    },
    {
      id: 3,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIao-KaLLXnLaeTnqXgGBFSAzBgeQgr0g1uA&usqp=CAU",
      content: "Ok anh",
      idSender: 2,
      time: "3 phút trước",
    },
  ];
  return (
    <>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="white"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.header.txtHeader}>{item.name}</Text>
        <View style={{ width: 24 }}></View>
      </View>
      <View style={styles.container}>
        <FlatList
          data={exMess}
          renderItem={({ item, index }) => {
            return (
              <>
                <View
                  style={
                    item.idSender == id
                      ? [styles.itemChat, { justifyContent: "flex-end" }]
                      : styles.itemChat
                  }
                >
                  {item.idSender == id ? null : (
                    <Image
                      source={{ uri: item.avatar }}
                      style={styles.avatar}
                    />
                  )}
                  {item.idSender == id ? (
                    <>
                      <View style={styles.view.owner}>
                        <Text style={styles.text.owner}>{item.content}</Text>
                      </View>
                    </>
                  ) : (
                    <View style={styles.view.shipper}>
                      <Text style={styles.text.shipper}>{item.content}</Text>
                    </View>
                  )}
                </View>
                {item.idSender == id ? (
                  <Text style={styles.time.owner}>{item.time}</Text>
                ) : (
                  <Text style={styles.time.shipper}>{item.time}</Text>
                )}
              </>
            );
          }}
          keyExtractor={(item) => item.id}
        />
        <View style={styles.viewInput}>
          <View style={styles.input}>
            <TextInput
              style={styles.txtInput}
              placeholder="Nhập tin nhắn..."
              numberOfLines={99}
            />
          </View>
          <Ionicons
            name="send"
            size={30}
            color={stylesGlobal.mainGreen}
            style={styles.iconSend}
          />
        </View>
      </View>
    </>
  );
}
