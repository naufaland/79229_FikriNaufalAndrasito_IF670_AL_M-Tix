import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import BottomNavigation from "./Navigation/BottomNavigation";
import MoviesScreen from "./Screens/MoviesScreen";
import FoodScreen from "./Screens/FoodScreen";
import PromosScreen from "./Screens/PromoScreen";
import MyVoucherScreen from "./Screens/MyVoucherScreen";
import "./global.css";

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs" component={BottomNavigation} />
          <Stack.Screen name="Movies" component={MoviesScreen} />
          <Stack.Screen name="Food" component={FoodScreen} />
          <Stack.Screen name="Promos" component={PromosScreen} />
          <Stack.Screen name="MyVoucher" component={MyVoucherScreen} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
