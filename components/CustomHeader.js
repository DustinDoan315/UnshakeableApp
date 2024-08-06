// CustomHeader.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { assets } from "../assets";
import { width } from "../utils/response";

const CustomHeader = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Image
          resizeMode="contain"
          style={{
            width: 24,
            height: 24,
          }}
          source={assets.back_arrow}
        />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: width,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    zIndex: 99,
  },
  backButton: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99,
  },
  headerTitle: {
    fontSize: 18,
    color: "white",
  },
});

export default CustomHeader;
