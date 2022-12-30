import { publicRoutes } from "./routes/routes";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {publicRoutes.map((route, index) => {
          return (
            <Stack.Screen
              name={route.name}
              component={route.component}
              options={{
                headerShown: route.header,
                animation: route.animation ? route.animation : null,
              }}
              key={index}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
