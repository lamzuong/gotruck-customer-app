import { publicRoutes } from "./routes/routes";
import stylesGlobal from "./global/stylesGlobal";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainScreen">
        {publicRoutes.map((route, index) => {
          return (
            <Stack.Screen
              name={route.name}
              component={route.component}
              options={{
                headerShown: route.header,
                animation: route.animation ? route.animation : null,
                headerTitle: () => (
                  <View style={styles.viewHeader}>
                    <Text style={styles.txtHeader}>{route.title}</Text>
                  </View>
                ),
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: stylesGlobal.mainGreen,
                },
              }}
              key={index}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  viewHeader: { alignItems: "center", width: "80%" },
  txtHeader: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
