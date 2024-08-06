import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Pressable,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomSwitch from "../components/CustomSwitch";
import CustomHeader from "../components/CustomHeader";
import { assets } from "../assets";
import { height, width } from "../utils/response";
import Logo from "../components/Logo";
import { LinearGradient } from "expo-linear-gradient";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResizeMode, Video } from "expo-av";
const videoSource = require("../assets/1min.mp4");

const securityQuestions = [
  { label: "What is your mother's maiden name?", value: "1" },
  { label: "What was the name of your first pet?", value: "2" },
  { label: "What was the name of your elementary school?", value: "3" },
];

const schema = yup.object().shape({
  questions: yup.array().of(yup.string().required("Please select a question")),
  answers: yup
    .array()
    .of(yup.string().required("Please provide an answer"))
    .min(3, "All answers are required"),
});

const MultiFactorAuthScreen = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isFaceIDEnabled, setFaceIDEnabled] = useState(false);

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

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      questions: ["", "", ""],
      answers: ["", "", ""],
    },
  });

  const values = getValues();

  const handleQuestionChange = (question) => {
    if (currentIndex !== null) {
      const questions = getValues("questions");
      questions[currentIndex] = question;
      setValue("questions", questions);
      setModalVisible(false);
      setCurrentIndex(null);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    navigation.navigate("Login");
  };

  const renderQuestionItem = ({ item }) => (
    <Pressable
      style={styles.modalItem}
      onPress={() => handleQuestionChange(item.label)}>
      <Text style={styles.modalItemText}>{item.label}</Text>
    </Pressable>
  );

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
            <Text style={styles.title}>Multi-Factor Authentication</Text>

            {Array.from({ length: 3 }).map((_, index) => (
              <View key={index} style={styles.questionAnswerContainer}>
                <Controller
                  control={control}
                  name={`questions[${index}]`}
                  render={({}) => (
                    <TouchableOpacity
                      style={[
                        styles.picker,
                        !values.questions?.[index]
                          ? styles.pickerPlaceholder
                          : null,
                      ]}
                      onPress={() => {
                        setCurrentIndex(index);
                        setModalVisible(true);
                      }}>
                      <Text style={styles.pickerText}>
                        {values.questions?.[index].length > 20
                          ? values.questions?.[index].slice(0, 26) + "..."
                          : values.questions?.[index] ||
                            `Select a question ${index + 1}`}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
                {errors.questions && errors.questions[index] && (
                  <Text style={styles.errorText}>
                    {errors.questions[index].message}
                  </Text>
                )}
                <Controller
                  control={control}
                  name={`answers[${index}]`}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.textField}
                      placeholder="Answer"
                      placeholderTextColor="#9A9A9A"
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                    />
                  )}
                />
                {errors.answers && errors.answers[index] && (
                  <Text style={styles.errorText}>
                    {errors.answers[index].message}
                  </Text>
                )}
              </View>
            ))}

            <View style={styles.faceIDContainer}>
              <Text style={styles.enableFaceIDText}>Enable Face ID</Text>
              <CustomSwitch
                value={isFaceIDEnabled}
                onValueChange={(value) => setFaceIDEnabled(value)}
              />
            </View>

            <LinearGradient
              start={{ x: 0, y: 0.1 }}
              end={{ x: 0, y: 1 }}
              style={styles.submitButton}
              colors={["#1375C1", "#61AEE9"]}>
              <TouchableOpacity
                style={{
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={handleSubmit(onSubmit)}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </LinearGradient>

            <View style={styles.needHelp}>
              <Text style={styles.needHelpText}>Need help?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("ContactUs")}>
                <Text style={styles.needHelpBtn}>Contact Us</Text>
              </TouchableOpacity>
            </View>

            <Modal
              visible={isModalVisible}
              transparent={true}
              animationType="slide"
              onRequestClose={() => setModalVisible(false)}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <FlatList
                    data={securityQuestions}
                    renderItem={renderQuestionItem}
                    keyExtractor={(item) => item.value}
                  />
                  <TouchableOpacity
                    style={styles.modalCloseButton}
                    onPress={() => setModalVisible(false)}>
                    <Text style={styles.modalCloseButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontFamily: "Open Sans Bold",
    color: "#9A9A9A",
    marginBottom: 20,
  },
  questionAnswerContainer: {
    width: "90%",
  },
  picker: {
    width: "100%",
    height: 44,
    backgroundColor: "#404040",
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  pickerPlaceholder: {
    justifyContent: "center",
  },
  pickerText: {
    color: "#9A9A9A",
  },
  textField: {
    width: "100%",
    height: 44,
    backgroundColor: "#404040",
    color: "#FFFFFF",
    paddingHorizontal: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginBottom: 16,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
    marginTop: -7,
  },
  submitButton: {
    width: width * 0.8,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 20,
  },
  submitButtonText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontFamily: "Open Sans Bold",
  },
  faceIDContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginRight: 20,
    alignSelf: "flex-end",
  },
  enableFaceIDText: {
    fontSize: 15,
    fontFamily: "Open Sans SemiBold",
    color: "#9A9A9A",
    marginRight: 10,
  },
  needHelpText: {
    fontSize: 15,
    fontFamily: "Open Sans SemiBold",
    color: "#9A9A9A",
  },
  contactUsText: {
    fontSize: 15,
    fontFamily: "Open Sans Bold",
    color: "#0A84FF",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#404040",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
  },
  modalItem: {
    padding: 10,
    width: "100%",
    borderBottomColor: "#9A9A9A",
    borderBottomWidth: 1,
  },
  modalItemText: {
    color: "#FFFFFF",
  },
  modalCloseButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#1375C1",
    borderRadius: 8,
  },
  modalCloseButtonText: {
    color: "#FFFFFF",
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

export default MultiFactorAuthScreen;
