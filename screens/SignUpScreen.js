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
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Video, ResizeMode } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import CustomHeader from "../components/CustomHeader";
import Logo from "../components/Logo";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import apiClient from "../utils/axiosConfig";

const { width, height } = Dimensions.get("window");

const videoSource = require("../assets/1min.mp4");

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Phone number must be only digits")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
  userName: yup.string().required("UserName is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const SignUpScreen = () => {
  const navigation = useNavigation();
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
  const createUser = async (user) => {
    try {
      console.log(user);
      const response = await apiClient.post("/users", user);
      Alert.alert("Create new user Successful", `Token: ${response.data.id}`);
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert(
        "Create new user Failed",
        error.response.status === 409 ? "Existing Account" : error.message
      );
    }
  };

  const onSubmit = (data) => {
    createUser(data);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.container}>
          <Video
            ref={videoRef}
            source={videoSource}
            style={styles.video}
            resizeMode={ResizeMode.CONTAIN}
            isLooping
          />
          <CustomHeader />
          <Logo />
          <View style={styles.overlay}>
            <Text style={styles.title}>Create your account</Text>
            <View style={styles.row}>
              <Controller
                control={control}
                name="firstName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    style={{
                      justifyContent: "center",
                      width: "48%",
                    }}>
                    <TextInput
                      style={[styles.textField, styles.halfWidth]}
                      placeholder="First Name"
                      placeholderTextColor="#9A9A9A"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                    {errors.firstName && (
                      <Text style={styles.errorText}>
                        {errors.firstName.message}
                      </Text>
                    )}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="lastName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    style={{
                      justifyContent: "center",
                      width: "48%",
                    }}>
                    <TextInput
                      style={[styles.textField, styles.halfWidth]}
                      placeholder="Last Name"
                      placeholderTextColor="#9A9A9A"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                    {errors.lastName && (
                      <Text style={styles.errorText}>
                        {errors.lastName.message}
                      </Text>
                    )}
                  </View>
                )}
              />
            </View>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.textField}
                  placeholder="Email"
                  placeholderTextColor="#9A9A9A"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.textField}
                  placeholder="Phone Number"
                  placeholderTextColor="#9A9A9A"
                  keyboardType="phone-pad"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.phoneNumber && (
              <Text style={styles.errorText}>{errors.phoneNumber.message}</Text>
            )}
            <Controller
              control={control}
              name="userName"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.textField}
                  placeholder="UserName"
                  placeholderTextColor="#9A9A9A"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.userName && (
              <Text style={styles.errorText}>{errors.userName.message}</Text>
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
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.textField}
                  placeholder="Confirm Password"
                  placeholderTextColor="#9A9A9A"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.confirmPassword && (
              <Text style={styles.errorText}>
                {errors.confirmPassword.message}
              </Text>
            )}
            <LinearGradient
              start={{ x: 0, y: 0.1 }}
              end={{ x: 0, y: 0.75 }}
              style={styles.signupButton}
              colors={["#1375C1", "#61AEE9"]}>
              <TouchableOpacity
                style={{
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={handleSubmit(onSubmit)}>
                <Text style={styles.signupButtonText}>Next</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      <View style={styles.signUpContainer}>
        <Text style={styles.dontHaveAccountText}>Already a user?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.signUpText}>Login</Text>
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
    width: "100%",
  },
  errorText: {
    alignSelf: "flex-start",
    color: "red",
    fontSize: 12,
    marginTop: -5,
    marginBottom: 10,
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

export default SignUpScreen;
