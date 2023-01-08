import styles from "./stylesSavedPlace";
import MyAddress from "../../../../components/MyAddress/MyAddress";
import ButtonAdd from "../../../../components/ButtonAdd/ButtonAdd";

import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";

export default function SavedPlace({ navigation }) {
  const address = [
    {
      name: "Nguyễn Văn A",
      phone: "079948511",
      address: "12 Nguyễn Văn Bảo, P.4, Q.Gò Vấp, TP.HCM",
      note: "Trường Đại học Công Nghiệp TPHCM",
    },
    {
      name: "Lê Văn B",
      phone: "091212111",
      address: "44/51 Lê Quang Sung, P.11, Q.6, TP.HCM",
      note: "Gần nhà sách Cây Gõ",
    },
    {
      name: "Lê Văn B",
      phone: "091212111",
      address: "44/51 Lê Quang Sung, P.11, Q.6, TP.HCM",
      note: "Gần nhà sách Cây Gõ",
    },
  ];
  const [listAddress, setListAddress] = useState(address);
  return (
    <ScrollView style={styles.container}>
      {listAddress.map((e, i) => (
        <MyAddress item={e} key={i} />
      ))}
      <View style={{ paddingBottom: 50 }}>
        <ButtonAdd
          action={() => {
            navigation.navigate("SearchLocationSavedPlace");
          }}
        />
      </View>
    </ScrollView>
  );
}
