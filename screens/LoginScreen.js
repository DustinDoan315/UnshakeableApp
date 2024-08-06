import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Video, ResizeMode } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import { height, width } from "../utils/response";
import Logo from "../components/Logo";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import apiClient from "../utils/axiosConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const videoSource = require("../assets/1min.mp4");

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginScreen = () => {
  const navigation = useNavigation();
  const videoRef = useRef(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

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

  const loginUser = async (email, password) => {
    try {
      const response = await apiClient.post("/login", { email, password });
      const { token } = response.data;
      await AsyncStorage.setItem("@auth_token", token);
      Alert.alert("Login Successful");
      navigation.navigate("Subscription");
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    }
  };

  const onSubmit = (data) => {
    loginUser(data.email, data.password);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Video
            ref={videoRef}
            source={videoSource}
            style={styles.video}
            resizeMode={ResizeMode.CONTAIN}
            isLooping
          />
          <Logo marginTop={50} marginBottom={75} />
          <View style={styles.overlay}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.textField}
                  placeholder="Email"
                  placeholderTextColor="#9A9A9A"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.textField}
                  placeholder="Password"
                  placeholderTextColor="#9A9A9A"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}

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
              <TouchableOpacity
                style={{
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={handleSubmit(onSubmit)}>
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          <View style={styles.signUpContainer}>
            <Text style={styles.dontHaveAccountText}>
              Don’t have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  errorText: {
    color: "red",
    marginBottom: 10,
    marginTop: -5,
    marginHorizontal: 30,
    alignSelf: "flex-start",
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
