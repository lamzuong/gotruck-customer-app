import styles from "./stylesOrderDetail";
import stylesGlobal from "../../../../global/stylesGlobal";
import MyButton from "../../../../components/MyButton/MyButton";

import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Ionicons, Foundation } from "@expo/vector-icons";

export default function OrderDetail({ route, navigation }) {
  const { order } = route.params;
  return (
    <View style={styles.container}>
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {/* Mã đơn */}
        <View style={styles.inline}>
          <Text style={styles.label}>Mã đơn</Text>
          <Text style={styles.contentHeader}>{order.id}</Text>
        </View>
        {/* Tàu xế */}
        <View style={styles.inline}>
          <Text style={styles.label}>Tài xế nhận đơn</Text>
          <Text style={styles.contentHeader}>
            {order.shipper.id ? (
              order.shipper.name
            ) : (
              <Text style={{ fontStyle: "italic" }}>Chưa có</Text>
            )}
          </Text>
        </View>
        <View style={styles.inline}>
          <Text style={styles.label}>Biển số xe</Text>
          <Text style={styles.contentHeader}>
            {order.shipper.id ? (
              order.shipper.numberTruck
            ) : (
              <Text style={{ fontStyle: "italic" }}>Chưa có</Text>
            )}
          </Text>
        </View>
        {/* Ngưởi gửi */}
        <View style={[styles.inline, { marginTop: 20 }]}>
          <Foundation
            name="record"
            size={24}
            color="#0DBEBE"
            style={{ width: 30 }}
          />
          <Text style={styles.label}>Người gửi</Text>
        </View>
        <Text style={styles.content}>
          {order.peopleSend + "\n" + order.from + "\n" + order.phoneSend}
        </Text>
        {/* Người nhận */}
        <View style={[styles.inline, { marginTop: 20 }]}>
          <Ionicons
            name="md-location-sharp"
            size={24}
            color="red"
            style={{ width: 30 }}
          />
          <Text style={styles.label}>Người nhận</Text>
        </View>
        <Text style={styles.content}>
          {order.peopleReceive + "\n" + order.to + "\n" + order.phoneReceive}
        </Text>
        {/* Ghi chú */}
        <Text style={[styles.label, { marginTop: 20 }]}>Ghi chú</Text>
        <ScrollView
          style={styles.viewNote}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.viewNote.txtNote}>{order.note}</Text>
        </ScrollView>
        {/* Thông tin còn lại */}
        <View style={{ marginVertical: 20 }}>
          <View style={styles.inline}>
            <Text style={styles.labelFooter}>Khoảng cách</Text>
            <Text style={styles.content}>{order.distance}</Text>
          </View>
          <View style={styles.inline}>
            <Text style={styles.labelFooter}>Thời gian dự kiến</Text>
            <Text style={styles.content}>{order.expectedTime}</Text>
          </View>
          <View style={styles.inline}>
            <Text style={styles.labelFooter}>Chi phí vận chuyển</Text>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {order.price
                .toFixed(0)
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " đ"}
            </Text>
          </View>
        </View>
      </ScrollView>
      {order.status == "Chưa nhận" || order.status == "Đã nhận" ? (
        <View style={styles.viewButton}>
          <MyButton
            type={"large"}
            text={"Hủy đơn"}
            btnColor={"red"}
            txtColor={"white"}
          />
        </View>
      ) : order.status == "Đã giao" ? (
        <View style={styles.viewButton}>
          <MyButton
            type={"large"}
            text={"Đánh giá"}
            btnColor={stylesGlobal.mainGreen}
            txtColor={"white"}
          />
        </View>
      ) : null}
    </View>
  );
}
