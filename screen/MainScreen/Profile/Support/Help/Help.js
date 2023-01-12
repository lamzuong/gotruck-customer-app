import styles from './stylesHelp';
import data from './data/dataHelp';

import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';

export default function Help() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {data.map((e, i) => (
        <View style={{ marginTop: 10 }} key={i}>
          <Collapse>
            <CollapseHeader>
              <View style={styles.header}>
                <Text style={styles.txtHeader}>{e.header}</Text>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <View style={styles.body}>{e.body}</View>
            </CollapseBody>
          </Collapse>
        </View>
      ))}
    </ScrollView>
  );
}
