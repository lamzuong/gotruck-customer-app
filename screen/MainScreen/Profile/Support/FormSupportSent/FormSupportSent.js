import styles from './stylesFormSupportSent';
import MyReport from '../../../../../components/MyReport/MyReport';

import { View, Text, ScrollView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

import axiosClient from '../../../../../api/axiosClient';
import { AuthContext } from '../../../../../context/AuthContext';

export default function FormSupportSent({ navigation }) {
  const [listReport, setListReport] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    (async function () {
      const allFeedBack = await axiosClient.get('gotruck/profile/feedback/' + user._id);
      if (allFeedBack && allFeedBack.length > 0) {
        setListReport(allFeedBack);
      }
    }).call(this);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ height: 10 }}></View>
        {listReport.length > 0 && listReport?.map((e, i) => <MyReport item={e} key={i} />)}
      </ScrollView>
    </View>
  );
}
