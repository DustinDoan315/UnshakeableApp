import React, { useEffect, useRef } from "react";
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
import { Video, ResizeMode } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import Logo from "../components/Logo";
import CustomHeader from "../components/CustomHeader";
import { assets } from "../assets";

const { width, height } = Dimensions.get("window");

const ForgotPasswordScreen1 = () => {
  const navigation = useNavigation();
  const videoRef = useRef(null);

  useEffect(() => {
    startPlayback();
  }, []);

  const startPlayback = async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.playAsync();
      } catch (error) {
        console.error("Error starting video playback:", error);
      }
    }
  };
  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={assets.videoSource}
        style={styles.video}
        resizeMode={ResizeMode.CONTAIN}
        isLooping
      />
      <CustomHeader />
      <Logo />
      <View style={styles.overlay}>
        <Text style={styles.title}>Forgot Password</Text>
        <TextInput
          style={styles.textField}
          placeholder="Email Address"
          placeholderTextColor="#9A9A9A"
        />
        <LinearGradient
          colors={["#1375C1", "#61AEE9"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.requestNewPasswordButton}>
          <TouchableOpacity onPress={() => navigation.navigate("Auth1")}>
            <Text style={styles.requestNewPasswordButtonText}>
              Request New Password
            </Text>
          </TouchableOpacity>
        </LinearGradient>
        <TouchableOpacity
          onPress={() => navigation.navigate("ForgotPassword2")}>
          <Text style={styles.tryAnotherWayText}>Try Another Way</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.needHelp}>
        <Text style={styles.needHelpText}>Need help?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.needHelpBtn}>Contact Us</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
  },
  video: {
    width,
    height: height * 0.9,
    position: "absolute",
  },
  overlay: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
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
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  requestNewPasswordButton: {
    width: width * 0.8,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 20,
  },
  requestNewPasswordButtonText: {
    fontSize: 18,
    fontFamily: "Open Sans Bold",
    color: "#FFFFFF",
  },
  tryAnotherWayText: {
    fontSize: 16,
    fontFamily: "Open Sans Bold",
    color: "#0A84FF",
    marginBottom: 20,
  },
  needHelp: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
  },
  needHelpText: {
    fontSize: 15,
    fontFamily: "Open Sans SemiBold",
    color: "#9A9A9A",
  },
  needHelpBtn: {
    fontSize: 15,
    fontFamily: "Open Sans Bold",
    color: "#0A84FF",
  },
});

export default ForgotPasswordScreen1;
