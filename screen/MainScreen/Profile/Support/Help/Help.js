import styles from './stylesHelp';

import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import { useIsFocused } from '@react-navigation/native';
import axiosClient from '../../../../../api/axiosClient';

export default function Help() {
  const isFocus = useIsFocused();
  const [data, setData] = useState([]);
  useEffect(() => {
    const getPolicy = async () => {
      const res = await axiosClient.get('gotruck/policy/customer/Customer');
      setData(res);
    };
    getPolicy();
  }, [isFocus]);
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {data.map((e, i) => (
        <View style={{ marginTop: 10 }} key={i}>
          <Collapse>
            <CollapseHeader>
              <View style={styles.header}>
                <Text style={styles.txtHeader}>{e?.title}</Text>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <View style={styles.body}>
                {e?.content.map((el, id) => (
                  <Text key={id} style={styles.txtBody}>
                    {'  '}
                    {el}
                  </Text>
                ))}
              </View>
            </CollapseBody>
          </Collapse>
        </View>
      ))}
    </ScrollView>
  );
}
