import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Video, ResizeMode } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import { height, width } from "../utils/response";
import Logo from "../components/Logo";

const videoSource = require("../assets/introVid.mp4");

const LoginScreen = () => {
  const navigation = useNavigation();
  const [status, setStatus] = useState({});
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
        source={videoSource}
        style={styles.video}
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <Logo marginTop={50} marginBottom={75} />
      <View style={styles.overlay}>
        <TextInput
          style={styles.textField}
          placeholder="Email"
          placeholderTextColor="#9A9A9A"
        />
        <TextInput
          style={styles.textField}
          placeholder="Password"
          placeholderTextColor="#9A9A9A"
          secureTextEntry
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("ForgotPassword1")}
          style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <LinearGradient
          start={{ x: 0, y: 0.1 }}
          end={{ x: 0, y: 1 }}
          style={styles.loginButton}
          colors={["#1375C1", "#61AEE9"]}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <View style={styles.signUpContainer}>
        <Text style={styles.dontHaveAccountText}>Don’t have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  video: {
    width: width,
    height: height * 0.9,
    position: "absolute",
  },
  overlay: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
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
    fontSize: 15,
    fontFamily: "Open Sans Regular",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginRight: 25,
    marginTop: -7,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily: "Open Sans Bold",
    color: "#0A84FF",
    marginBottom: 20,
  },
  loginButton: {
    width: 110,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 20,
  },
  loginButtonText: {
    fontSize: 18,
    fontFamily: "Open Sans Bold",
    color: "#FFFFFF",
  },
  signUpContainer: {
    flexDirection: "row",
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
  },
  dontHaveAccountText: {
    fontSize: 15,
    fontFamily: "Open Sans SemiBold",
    color: "#9A9A9A",
  },
  signUpText: {
    fontSize: 15,
    fontFamily: "Open Sans Bold",
    color: "#0A84FF",
  },
});

export default LoginScreen;
