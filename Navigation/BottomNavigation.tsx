import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Import screens
import HomeScreen from "../Screens/HomeScreen";
import MyOrderScreen from "../Screens/MyOrderScreen";
import PromosScreen from "../Screens/PromoScreen";
import MyMTIXScreen from "../Screens/MyMTIXScreen";
import MoviesScreen from "../Screens/MoviesScreen";

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      id={undefined}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#4ECDC4",
        tabBarInactiveTintColor: "#8A8A8A",
        tabBarStyle: {
          backgroundColor: "#121212",
          height: 60,
          paddingBottom: 10,
          borderTopWidth: 1,
          borderTopColor: "#222",
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="My Order"
        component={MyOrderScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ticket" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Promos"
        component={PromosScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="pricetag" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="My M-TIX"
        component={MyMTIXScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
