import React, { useEffect, useRef, useState } from "react";
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
import CustomHeader from "../components/CustomHeader";
import { assets } from "../assets";
import Logo from "../components/Logo";

const { width, height } = Dimensions.get("window");

const SignUpScreen = () => {
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
        source={assets.videoSource}
        style={styles.video}
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <CustomHeader />
      <Logo />

      <View style={styles.overlay}>
        <Text style={styles.title}>Create your account</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.textField, styles.halfWidth]}
            placeholder="First Name"
            placeholderTextColor="#9A9A9A"
          />
          <TextInput
            style={[styles.textField, styles.halfWidth]}
            placeholder="Last Name"
            placeholderTextColor="#9A9A9A"
          />
        </View>
        <TextInput
          style={styles.textField}
          placeholder="Email"
          placeholderTextColor="#9A9A9A"
        />
        <TextInput
          style={styles.textField}
          placeholder="Phone Number"
          placeholderTextColor="#9A9A9A"
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.textField}
          placeholder="Username"
          placeholderTextColor="#9A9A9A"
        />
        <TextInput
          style={styles.textField}
          placeholder="Password"
          placeholderTextColor="#9A9A9A"
          secureTextEntry
        />
        <TextInput
          style={styles.textField}
          placeholder="Confirm Password"
          placeholderTextColor="#9A9A9A"
          secureTextEntry
        />
        <LinearGradient
          start={{ x: 0, y: 0.1 }}
          end={{ x: 0, y: 0.75 }}
          style={styles.signupButton}
          colors={["#1375C1", "#61AEE9"]}>
          <TouchableOpacity onPress={() => navigation.navigate("OTP")}>
            <Text style={styles.signupButtonText}>Next</Text>
          </TouchableOpacity>
        </LinearGradient>
        <View style={styles.signUpContainer}>
          <Text style={styles.dontHaveAccountText}>Already a user?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.signUpText}>Login</Text>
          </TouchableOpacity>
        </View>
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
  title: {
    fontSize: 14,
    fontFamily: "Open Sans Bold",
    color: "#9A9A9A",
    marginBottom: 16,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 12,
  },
  textField: {
    width: "100%",
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
  halfWidth: {
    width: "48%",
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
  signupButton: {
    width: "100%",
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 20,
  },
  signupButtonText: {
    fontSize: 18,
    fontFamily: "Open Sans Bold",
    color: "#FFFFFF",
  },
  signUpContainer: {
    flexDirection: "row",
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

export default SignUpScreen;
