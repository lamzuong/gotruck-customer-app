import styles from './stylesOrder';
import stylesGlobal from '../../../global/stylesGlobal';
import { publicRoutes } from './routes/routes';

import { View, Text } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import axiosClient from '../../../api/axiosClient';
import { AuthContext } from '../../../context/AuthContext';
import { SetListOrder } from '../../../context/AuthAction';
import { socketClient } from '../../../global/socket';

const TopTab = createMaterialTopTabNavigator();

export default function Order() {
  const { user, listOrder, dispatch } = useContext(AuthContext);
  
  const renderUI = async () => {
    const orderList = await axiosClient.get('gotruck/order/user/' + user._id);
    dispatch(SetListOrder(orderList));
  };

  useEffect(() => {
    socketClient.off(user._id + '');
    socketClient.on(user._id + '', (data) => {
      renderUI();
    });
  }, []);

  return (
    <>
      <Text style={styles.title}>Đơn hàng</Text>

      <TopTab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarActiveTintColor: stylesGlobal.mainGreen,
          tabBarInactiveTintColor: stylesGlobal.darkGrey,
          tabBarIndicatorStyle: {
            backgroundColor: stylesGlobal.mainGreen,
            height: 2,
          },
          tabBarStyle: {
            backgroundColor: '#fff',
          },
          tabBarItemStyle: {
            width: 'auto',
            alignItems: 'center',
          },
          tabBarLabelStyle: {
            textTransform: 'capitalize',
          },
        }}
      >
        {publicRoutes.map((route, key) => {
          return (
            <TopTab.Screen
              name={route.name}
              component={route.component}
              options={{
                tabBarLabel: ({ focused }) => (
                  <Text style={focused ? styles.textFocus : styles.text}>{route.title}</Text>
                ),
              }}
              key={key}
            />
          );
        })}
      </TopTab.Navigator>
    </>
  );
}
