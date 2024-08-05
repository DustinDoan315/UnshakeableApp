import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CustomSwitch = ({ value, onValueChange }: any) => {
  return (
    <TouchableOpacity
      style={[
        styles.switchContainer,
        { backgroundColor: value ? "#81b0ff" : "#767577" },
      ]}
      onPress={() => onValueChange(!value)}>
      <View
        style={[
          styles.switchThumb,
          { transform: [{ translateX: value ? 20 : 0 }] },
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    width: 40,
    height: 20,
    borderRadius: 15,
    justifyContent: "center",
    padding: 2,
    position: "relative",
  },
  switchThumb: {
    width: 16,
    height: 16,
    borderRadius: 13,
    backgroundColor: "#f4f3f4",
    position: "absolute",
    top: 2,
    left: 2,
  },
});

export default CustomSwitch;
