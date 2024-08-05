import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Video from "react-native-video";

const { width, height } = Dimensions.get("window");

const ResetPasswordScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* <Video
        source={require("../assets/5 7.MP4")}
        style={styles.video}
        resizeMode="cover"
        repeat
        muted
      /> */}
      <View style={styles.overlay}>
        <Image
          source={require("../assets/Unshakeable_Full_Color_Logomark Minus_Text@3x.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Forgot Password</Text>
        <TextInput
          style={styles.textField}
          placeholder="Enter New Password"
          placeholderTextColor="#9A9A9A"
        />
        <TextInput
          style={styles.textField}
          placeholder="Confirm New Password"
          placeholderTextColor="#9A9A9A"
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.resetPasswordButton}
          onPress={() => navigation.navigate("Login")}>
          <Text style={styles.resetPasswordButtonText}>Reset Password</Text>
        </TouchableOpacity>
        <Text style={styles.needHelpText}>Need Help?</Text>
        <TouchableOpacity>
          <Text style={styles.contactUsText}>Contact Us</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width,
    height,
    position: "absolute",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  resetPasswordButton: {
    width: 110,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "linear-gradient(180deg, #1375C1 0%, #61AEE9 100%)",
    marginBottom: 20,
  },
  resetPasswordButtonText: {
    fontSize: 18,
    fontFamily: "Open Sans Bold",
    color: "#FFFFFF",
  },
  needHelpText: {
    fontSize: 15,
    fontFamily: "Open Sans SemiBold",
    color: "#9A9A9A",
    marginBottom: 20,
  },
  contactUsText: {
    fontSize: 15,
    fontFamily: "Open Sans Bold",
    color: "#0A84FF",
  },
});

export default ResetPasswordScreen;
