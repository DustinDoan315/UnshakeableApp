import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Video, ResizeMode } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import { height, width } from "../utils/response";
import { assets } from "../assets";
import Logo from "../components/Logo";
import CustomHeader from "../components/CustomHeader";

const videoSource = require("../assets/introVid.mp4");

const OtpScreen = () => {
  const navigation = useNavigation();
  const [status, setStatus] = useState({});
  const videoRef = useRef(null);
  const [otp, setOtp] = useState("");
  const otpRefs = useRef([]);

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
  const handleChange = (text, index) => {
    const otpArray = otp.split("");
    otpArray[index] = text;
    const newOtp = otpArray.join("");
    setOtp(newOtp);

    if (text && index < otpRefs.current.length - 1) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (key, index) => {
    if (key === "Backspace" && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.scrollContainer}>
        <Video
          ref={videoRef}
          source={videoSource}
          style={styles.video}
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
        <CustomHeader />
        <Logo />
        <View style={styles.overlay}>
          <Text style={styles.verification}>OTP Verification</Text>
          <View
            style={{
              width: "82%",
              marginVertical: 16,
              paddingHorizontal: 16,
              paddingVertical: 16,
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              borderRadius: 16,
              justifyContent: "center",
              alignContent: "center",
            }}>
            <Text style={styles.verification}>
              Enter the code from the sms we've sent to (219) 405 8593
            </Text>
          </View>
          <View style={styles.otpContainer}>
            {[...Array(5)].map((_, index) => (
              <TextInput
                key={index}
                ref={(ref) => (otpRefs.current[index] = ref)}
                style={styles.otpInput}
                keyboardType="numeric"
                maxLength={1}
                value={otp[index] || ""}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={({ nativeEvent: { key } }) =>
                  handleKeyPress(key, index)
                }
              />
            ))}
          </View>

          <View style={styles.resendOtp}>
            <Text style={styles.resendOtpText}>Didn`t receive the OTP?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.resend}>Resend</Text>
            </TouchableOpacity>
          </View>

          <LinearGradient
            start={{ x: 0, y: 0.1 }}
            end={{ x: 0, y: 1 }}
            style={styles.verifyButton}
            colors={["#1375C1", "#61AEE9"]}>
            <TouchableOpacity
              onPress={() => navigation.navigate("MultiFactorAuth")}>
              <Text style={styles.verifyButtonText}>Next</Text>
            </TouchableOpacity>
          </LinearGradient>

          <View style={styles.needHelp}>
            <Text style={styles.needHelpText}>Need help?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.needHelpBtn}>Contact Us</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width,
    height: height * 0.9,
    position: "absolute",
  },
  logo: {
    alignSelf: "center",
    marginTop: 100,
    width: 275,
    height: 250,
  },
  overlay: {
    flex: 1,
    marginTop: -75,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  verification: {
    fontSize: 16,
    color: "#9A9A9A",
    textAlign: "center",
  },
  instructionText: {
    fontSize: 18,
    color: "#FFFFFF",
    marginBottom: 20,
    textAlign: "center",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 16,
  },
  otpInput: {
    width: 45,
    height: 45,
    backgroundColor: "#404040",
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  verifyButton: {
    width: width * 0.8,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 20,
  },
  verifyButtonText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontFamily: "Open Sans Bold",
  },
  resendOtp: {
    flexDirection: "row",
    marginVertical: 16,
  },
  resendOtpText: {
    fontSize: 15,
    fontFamily: "Open Sans SemiBold",
    color: "#9A9A9A",
  },
  resend: {
    fontSize: 15,
    fontFamily: "Open Sans Bold",
    color: "#0A84FF",
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

export default OtpScreen;
