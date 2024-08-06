import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ResizeMode, Video } from "expo-av";
import { assets } from "../assets";
import CustomHeader from "../components/CustomHeader";
import Logo from "../components/Logo";
import { height } from "../utils/response";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const { width } = Dimensions.get("window");

const schema = yup.object().shape({
  newPassword: yup
    .string()
    .required("New password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const PasswordResetScreen = ({ navigation }) => {
  const videoRef = useRef(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
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

  const onSubmit = (data) => {
    Alert.alert("Password reset successful");
    console.log("Form Data:", data);
    // navigation.navigate("Login");
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
          <Text style={styles.title}>Password Reset</Text>

          <Controller
            control={control}
            name="newPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.textField}
                placeholder="New Password"
                placeholderTextColor="#9A9A9A"
                secureTextEntry
              />
            )}
          />
          {errors.newPassword && (
            <Text style={styles.errorText}>{errors.newPassword.message}</Text>
          )}

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.textField}
                placeholder="Confirm New Password"
                placeholderTextColor="#9A9A9A"
                secureTextEntry
              />
            )}
          />
          {errors.confirmPassword && (
            <Text style={styles.errorText}>
              {errors.confirmPassword.message}
            </Text>
          )}

          <LinearGradient
            colors={["#1375C1", "#61AEE9"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.resetButton}>
            <TouchableOpacity
              style={styles.resetButtonInner}
              onPress={handleSubmit(onSubmit)}>
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
          </LinearGradient>
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
    alignItems: "center",
  },
  innerContainer: {
    width: width * 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: width,
    height: height * 0.9,
    position: "absolute",
    top: 0,
  },
  title: {
    fontSize: 18,
    fontFamily: "Open Sans Bold",
    color: "#9A9A9A",
    marginBottom: 20,
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
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  resetButton: {
    width: "100%",
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 20,
  },
  resetButtonInner: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  resetButtonText: {
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
  errorText: {
    color: "#FF0000",
    marginBottom: 12,
    alignSelf: "flex-start",
    marginTop: -7,
  },
});

export default PasswordResetScreen;
