import React, { useRef } from "react";
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

const { width, height } = Dimensions.get("window");

// Ensure videoSource is a valid path or URI
const videoSource = require("../assets/introVid.mp4");
const LoginScreen = () => {
  const navigation = useNavigation();
  const [status, setStatus] = React.useState({});
  const videoRef = useRef(null);

  React.useEffect(() => {
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
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <View style={styles.overlay}>
        {/* Uncomment and use if logo is available */}
        {/* <Image
          source={require("../assets/Unshakeable_Full_Color_Logomark Minus_Text@3x.png")}
          style={styles.logo}
        /> */}
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
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate("Home")}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
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
    backgroundColor: "#1375C1", // Adjusted for React Native as linear gradients are not supported directly
    marginBottom: 20,
  },
  loginButtonText: {
    fontSize: 18,
    fontFamily: "Open Sans Bold",
    color: "#FFFFFF",
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
