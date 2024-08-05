import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

const ContactUsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* <Image
        source={require("../assets/unshakeable_logo.png")}
        style={styles.logo}
      /> */}
      <Text style={styles.title}>Contact Us</Text>
      <TextInput
        style={styles.textField}
        placeholder="Your email"
        placeholderTextColor="#FFFFFF"
      />
      <TextInput
        style={styles.messageField}
        placeholder="Your message"
        placeholderTextColor="#FFFFFF"
        multiline
      />
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
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
  logo: {
    width: 227,
    height: 227,
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontFamily: "Open Sans Bold",
    color: "#9A9A9A",
    marginBottom: 20,
  },
  textField: {
    width: 318,
    height: 44,
    backgroundColor: "#404040",
    color: "#FFFFFF",
    marginBottom: 12,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  messageField: {
    width: 318,
    height: 169,
    backgroundColor: "#404040",
    color: "#FFFFFF",
    marginBottom: 12,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  submitButton: {
    width: 110,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "linear-gradient(180deg, #1375C1 0%, #61AEE9 100%)",
    marginBottom: 20,
  },
  submitButtonText: {
    fontSize: 18,
    fontFamily: "Open Sans Bold",
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

export default ContactUsScreen;
