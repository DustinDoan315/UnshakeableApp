import { View, Text } from "react-native";
import React from "react";
import CustomHeader from "../components/CustomHeader";

const HomeScreen = () => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}>
      <CustomHeader />
      <Text>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;
