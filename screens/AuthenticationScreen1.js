import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CustomHeader from "../components/CustomHeader";
import Logo from "../components/Logo";
import { ResizeMode, Video } from "expo-av";
import { assets } from "../assets";
import { height } from "../utils/response";

const { width } = Dimensions.get("window");

const AuthenticationScreen1 = ({ navigation }) => {
  const videoRef = useRef(null);
  const [code, setCode] = useState("");
  const [authCode, setAuthCode] = useState(generateAuthCode());

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

  function generateAuthCode() {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  const handleAuthCode = () => {
    if (+code === +authCode) {
      Alert.alert("Success authentication");
      navigation.navigate("PasswordReset");
    } else {
      Alert.alert("Auth Code is not available");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <Video
            ref={videoRef}
            source={assets.video1minSource}
            style={styles.video}
            resizeMode={ResizeMode.CONTAIN}
            isLooping
          />
          <CustomHeader />
          <Logo />
          <View style={styles.overlay}>
            <Text style={styles.keepAccountSecureText}>
              We Keep The Account Secure
            </Text>
            <Text style={styles.layerOfSecurityText}>Layer of Security</Text>
            <Text style={styles.messageRatesText}>
              Message rates may apply. Message and data rates may apply.
            </Text>
            <Text style={styles.enterAuthenticationCodeText}>
              Enter Authentication Code
            </Text>
            <TextInput
              onChangeText={(e) => setCode(e)}
              maxLength={4}
              style={styles.textField}
              placeholder="Authentication Code"
              placeholderTextColor="#9A9A9A"
              keyboardType="numeric"
            />
            <LinearGradient
              colors={["#1375C1", "#61AEE9"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.nextButton}>
              <TouchableOpacity
                style={{
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={handleAuthCode}>
                <Text style={styles.nextButtonText}>Next</Text>
              </TouchableOpacity>
            </LinearGradient>
            <Text style={styles.authCodeText}>Your auth code: {authCode}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.needHelp}>
        <Text style={styles.needHelpText}>Need help?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("ContactUs")}>
          <Text style={styles.needHelpBtn}>Contact Us</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: width,
    height: height * 0.9,
    position: "absolute",
    top: 0,
  },
  overlay: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    zIndex: 1,
  },
  keepAccountSecureText: {
    fontSize: 18,
    fontFamily: "Open Sans Bold",
    color: "#9A9A9A",
    marginBottom: 20,
  },
  layerOfSecurityText: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Open Sans Regular",
    color: "#9A9A9A",
    marginBottom: 8,
  },
  messageRatesText: {
    fontSize: 12,
    textAlign: "center",
    fontFamily: "Open Sans Regular",
    color: "#9A9A9A",
    marginBottom: 20,
  },
  enterAuthenticationCodeText: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Open Sans SemiBold",
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
  nextButton: {
    width: width * 0.8,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 20,
  },
  nextButtonText: {
    fontSize: 18,
    fontFamily: "Open Sans Bold",
    color: "#FFFFFF",
  },
  needHelp: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
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
  authCodeText: {
    fontSize: 14,
    fontFamily: "Open Sans Regular",
    color: "#FFFFFF",
    marginTop: 10,
  },
});

export default AuthenticationScreen1;
