import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../pages/HomeScreen";
import RegistrationScreen from "../pages/RegistrationScreen";
import UploadScreen from "../pages/UploadScreen";
import ReviewScreen from "../pages/ReviewScreen";

const Stack = createNativeStackNavigator();

export default function MainScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Upload"
          component={UploadScreen}
          options={{
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="Review"
          component={ReviewScreen}
          options={{
            headerTitle: "",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
