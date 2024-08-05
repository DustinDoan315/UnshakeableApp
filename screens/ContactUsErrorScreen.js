import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const ContactUsErrorScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* <Image
        source={require("../assets/exclamation_mark.png")}
        style={styles.icon}
      /> */}
      <Text style={styles.title}>Error!</Text>
      <Text style={styles.tryAgainText}>Try Again</Text>
      <TouchableOpacity
        style={styles.doneButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
  icon: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Open Sans Bold",
    color: "#9A9A9A",
    marginBottom: 20,
  },
  tryAgainText: {
    fontSize: 24,
    fontFamily: "Open Sans Bold",
    color: "#0A84FF",
    marginBottom: 20,
  },
  doneButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A84FF",
    width: 110,
    height: 44,
    marginBottom: 20,
  },
  doneButtonText: {
    fontSize: 22,
    fontFamily: "Open Sans SemiBold",
    color: "#FFFFFF",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  backButtonText: {
    fontSize: 18,
    fontFamily: "Open Sans Bold",
    color: "#0A84FF",
  },
});

export default ContactUsErrorScreen;
