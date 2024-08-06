import React, { useEffect, useRef } from "react";
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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Video, ResizeMode } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import Logo from "../components/Logo";
import CustomHeader from "../components/CustomHeader";
import { assets } from "../assets";
import { useForm, Controller } from "react-hook-form";

const { width, height } = Dimensions.get("window");

const ForgotPasswordScreen2 = () => {
  const navigation = useNavigation();
  const videoRef = useRef(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
    console.log("Form Data:", data);
    navigation.navigate("Auth2");
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
            <Text style={styles.title}>Forgot Password</Text>
            <Controller
              control={control}
              name="phoneNumber"
              rules={{
                required: "Phone Number is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Invalid phone number",
                },
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <>
                  <TextInput
                    style={[
                      styles.textField,
                      errors.phoneNumber && styles.textFieldError,
                    ]}
                    placeholder="Phone Number"
                    placeholderTextColor="#9A9A9A"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="phone-pad"
                  />
                  {errors.phoneNumber && (
                    <Text style={styles.errorText}>
                      {errors.phoneNumber.message}
                    </Text>
                  )}
                </>
              )}
            />
            <LinearGradient
              colors={["#1375C1", "#61AEE9"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.requestNewPasswordButton}>
              <TouchableOpacity
                style={{
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={handleSubmit(onSubmit)}>
                <Text style={styles.requestNewPasswordButtonText}>
                  Request New Password
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.needHelp}>
        <Text style={styles.needHelpText}>Need help?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
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
    width,
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
  textFieldError: {},
  errorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginBottom: 12,
    marginLeft: 10,
    marginTop: -7,
    alignSelf: "flex-start",
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
});

export default ForgotPasswordScreen2;
