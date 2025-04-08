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
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import CreatePin from "./components/CreatePin";
import ConfirmPin from "./components/ConfirmPin";
import ConfirmLoginPin from "./Screens/ConfirmLoginPin";

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          {/* Auth Screens */}
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="CreatePin" component={CreatePin} />
          <Stack.Screen name="ConfirmPin" component={ConfirmPin} />
          <Stack.Screen name="ConfirmLoginPin" component={ConfirmLoginPin} />

          {/* Main Screens */}
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
