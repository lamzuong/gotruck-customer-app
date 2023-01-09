import styles from "./stylesNewOrder";
import stylesGlobal from "../../../../global/stylesGlobal";
import { sliceIntoChunks } from "../../../../global/functionGlobal";
import truckTypes from "../data/truckTypes";
import goodsTypes from "../data/goodsTypes";
import MyButton from "../../../../components/MyButton/MyButton";
import ButtonAdd from "../../../../components/ButtonAdd/ButtonAdd";

import { View, Text, Pressable, ScrollView } from "react-native";
import { TextInput, Image } from "react-native";
import React, { useState } from "react";
import { Foundation, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ReadMore from "react-native-read-more-text";
import DropDownPicker from "react-native-dropdown-picker";

export default function NewOrder({ navigation }) {
  const [addressFrom, setAddressFrom] = useState(
    "336/15 Lê Hồng Phong P.12 Q.5 TP. Hồ Chí Minh"
  );
  const [addressTo, setAddressTo] = useState(
    "336/15 Lê Hồng Phong P.12 Q.5 TP. Hồ Chí Minh"
  );

  const [openTruck, setOpenTruck] = useState(false);
  const [valueTruck, setValueTruck] = useState(truckTypes[0].value);
  const [itemsTruck, setItemsTruck] = useState(truckTypes);

  const [openGoods, setOpenGoods] = useState(false);
  const [valueGoods, setValueGoods] = useState(goodsTypes[0].value);
  const [itemsGoods, setItemsGoods] = useState(goodsTypes);

  const [weight, setWeight] = useState();
  const [images, setImages] = useState([
    "https://hosonhanvat.net/wp-content/uploads/2020/07/chopper-2.jpg",
    "https://hosonhanvat.net/wp-content/uploads/2020/07/chopper-2.jpg",
    "https://ecdn.game4v.com/g4v-content/uploads/2020/05/Khoanh-khac-vi-dai-cua-Luffy-0-game4v.png",
    "https://hosonhanvat.net/wp-content/uploads/2020/07/chopper-2.jpg",
    // "https://i.pinimg.com/736x/36/f0/48/36f048323e3f06ddce7eb9ec301aaeb2.jpg",
    // "https://hosonhanvat.net/wp-content/uploads/2020/07/chopper-2.jpg",
    "https://genk.mediacdn.vn/2019/4/16/photo-1-1555407801845981270262.jpg",
    "https://genk.mediacdn.vn/2019/4/16/photo-1-1555407801845981270262.jpg",
    "https://upload.wikimedia.org/wikipedia/vi/f/f8/Nami_face.jpg",
  ]);

  const [distance, setDistance] = useState("14 km");
  const [time, setTime] = useState("3-5 ngày");
  const [price, setPrice] = useState(1230100);

  const renderRowImage = (arr, listImages = [], column = 3) => {
    return (
      <View>
        <View style={{ flexDirection: "row", marginVertical: 10 }}>
          {arr.map((e, i) => (
            <View style={{ width: "36%" }} key={i}>
              <Image source={{ uri: e }} style={styles.itemImage} />
            </View>
          ))}
          {arr[arr.length - 1] == listImages[listImages.length - 1] &&
          arr.length < column ? (
            <ButtonAdd action={() => {}} />
          ) : null}
        </View>
        {arr[arr.length - 1] == listImages[listImages.length - 1] &&
        arr.length == column ? (
          <ButtonAdd action={() => {}} />
        ) : null}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Nơi lấy hàng */}
      <View>
        <Text style={styles.label}>Nơi lấy hàng</Text>
        <Pressable
          style={styles.input}
          onPress={() => {
            navigation.navigate("SearchLocation");
          }}
        >
          <Foundation
            name="record"
            size={24}
            color="#0DBEBE"
            style={{ width: 30 }}
          />
          <ReadMore numberOfLines={1} renderTruncatedFooter={() => null}>
            <Text style={styles.font18}>{addressFrom}</Text>
          </ReadMore>
          <MaterialIcons name="navigate-next" size={24} color="black" />
        </Pressable>
      </View>
      {/* Giao tới */}
      <View style={{ marginTop: 20 }}>
        <Text style={styles.label}>Giao tới</Text>
        <Pressable
          style={styles.input}
          onPress={() => {
            navigation.navigate("SearchLocation");
          }}
        >
          <Ionicons
            name="location-sharp"
            size={24}
            color="red"
            style={{ width: 30 }}
          />
          <ReadMore numberOfLines={1} renderTruncatedFooter={() => null}>
            <Text style={styles.font18}>{addressTo}</Text>
          </ReadMore>
          <MaterialIcons name="navigate-next" size={24} color="black" />
        </Pressable>
      </View>
      {/* Chọn loại xe */}
      <View style={{ marginTop: 20 }}>
        <Text style={styles.label}>Chọn loại xe</Text>
        <View style={{ marginTop: 10, flexDirection: "row" }}>
          <DropDownPicker
            open={openTruck}
            value={valueTruck}
            items={itemsTruck}
            setOpen={setOpenTruck}
            setValue={setValueTruck}
            setItems={setItemsTruck}
            labelStyle={styles.font18}
            textStyle={styles.font18}
            zIndex={10000}
            listMode="SCROLLVIEW"
            scrollViewProps={{
              nestedScrollEnabled: true,
            }}
          />
        </View>
      </View>
      {/* Loại hàng hóa */}
      <View style={{ marginTop: 20 }}>
        <Text style={styles.label}>Loại hàng hóa</Text>
        <View style={{ marginTop: 10, flexDirection: "row" }}>
          <DropDownPicker
            open={openGoods}
            value={valueGoods}
            items={itemsGoods}
            setOpen={setOpenGoods}
            setValue={setValueGoods}
            setItems={setItemsGoods}
            labelStyle={{ fontSize: 18 }}
            textStyle={{ fontSize: 18 }}
            maxHeight={170}
            listMode="SCROLLVIEW"
            scrollViewProps={{
              nestedScrollEnabled: true,
            }}
          />
        </View>
      </View>
      {/* Kích thước, tải trọng hàng hóa */}
      <View style={{ marginTop: 20 }}>
        <Text style={styles.label}>Cân nặng</Text>
        <View style={[styles.input, styles.input.addition]}>
          <MaterialCommunityIcons
            name="weight-kilogram"
            size={24}
            color="black"
            style={{ width: 30 }}
          />
          <Pressable style={{ flexDirection: "row" }} onPress={() => {}}>
            <TextInput
              textAlign="right"
              style={[styles.font18, styles.font18.addition]}
              keyboardType={"number-pad"}
              onChangeText={(text) => setWeight(text)}
              value={weight}
            />
            <Text style={[styles.font18, { marginTop: 1 }]}>KG</Text>
          </Pressable>
        </View>
      </View>
      {/* Hình ảnh */}
      <View style={{ marginTop: 20 }}>
        <Text style={styles.label}>Hình ảnh hàng hóa</Text>
        {sliceIntoChunks(images, 3).map((e, i) => (
          <View key={i}>{renderRowImage(e, images, 3)}</View>
        ))}
      </View>
      {/* Thời gian, chi phí */}
      <View style={{ marginTop: 30 }}>
        <View style={stylesGlobal.inlineBetween}>
          <Text style={styles.font18}>Khoảng cách</Text>
          <Text style={styles.font18}>{distance}</Text>
        </View>
        <View style={[stylesGlobal.inlineBetween, { marginTop: 8 }]}>
          <Text style={styles.font18}>Thời gian dự kiến</Text>
          <Text style={styles.font18}>{time}</Text>
        </View>
        <View style={[stylesGlobal.inlineBetween, { marginTop: 8 }]}>
          <Text style={styles.font18}>Phí vận chuyển</Text>
          <Text style={styles.price}>
            {price.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " đ"}
          </Text>
        </View>
      </View>
      {/* Button */}
      <View style={{ marginTop: 10, marginBottom: 50 }}>
        <MyButton
          text={"Tiếp theo"}
          type="large"
          btnColor={stylesGlobal.mainGreen}
          txtColor="white"
          action={() => {
            navigation.navigate("NewOrderDetail", {
              item: {
                addressFrom,
                addressTo,
                truckType: valueTruck,
                goodType: valueGoods,
                weight,
                images,
                time,
                price,
              },
            });
          }}
        />
      </View>
    </ScrollView>
  );
}
