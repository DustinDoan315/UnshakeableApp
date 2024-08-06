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
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ResizeMode, Video } from "expo-av";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomHeader from "../components/CustomHeader";
import Logo from "../components/Logo";
import { assets } from "../assets";
import { height } from "../utils/response";
import SuccessFailModal from "../components/SuccessFailModal";

const { width } = Dimensions.get("window");

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  subject: yup.string().required("Subject is required"),
  message: yup.string().required("Message is required"),
});

const ContactUsScreen = () => {
  const videoRef = useRef(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);

  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
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
    setIsSuccess(false);
    handleOpenModal();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView showsVerticalScrollIndicator={false}>
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
              <Text style={styles.title}>Contact Us</Text>

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
                    keyboardType="email-address"
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
                name="subject"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.textField}
                    placeholder="Subject"
                    placeholderTextColor="#9A9A9A"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.subject && (
                <Text style={styles.errorText}>{errors.subject.message}</Text>
              )}
              <Controller
                control={control}
                name="message"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.textField, styles.messageField]}
                    placeholder="Message"
                    placeholderTextColor="#9A9A9A"
                    multiline
                    numberOfLines={4}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.message && (
                <Text style={styles.errorText}>{errors.message.message}</Text>
              )}
              <LinearGradient
                colors={["#1375C1", "#61AEE9"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.submitButton}>
                <TouchableOpacity
                  style={styles.submitButtonInner}
                  onPress={handleSubmit(onSubmit)}>
                  <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>

      <SuccessFailModal
        isVisible={isModalVisible}
        isSuccess={isSuccess}
        onClose={handleCloseModal}
      />
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
    width: width,
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
  title: {
    fontSize: 18,
    fontFamily: "Open Sans Bold",
    color: "#9A9A9A",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 318,
  },
  halfWidth: {
    width: "100%",
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
  messageField: {
    minHeight: 88,
  },
  submitButton: {
    width: width * 0.8,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 20,
  },
  submitButtonInner: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 18,
    fontFamily: "Open Sans Bold",
    color: "#FFFFFF",
  },
  errorText: {
    color: "red",
    marginBottom: 8,
    alignSelf: "flex-start",
    marginHorizontal: 10,
    marginTop: -7,
  },
});

export default ContactUsScreen;
