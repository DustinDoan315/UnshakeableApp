import React from "react";
import {
  View,
  Text,
  Image,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from "react-native";

const { width, height } = Dimensions.get("window");

const SuccessFailModal = ({ isVisible, isSuccess, onClose }) => {
  const successImage = require("../assets/success_submitted.png");
  const failImage = require("../assets/fail_submitted.png");

  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="slide"
      onRequestClose={onClose}>
      <Pressable onPress={onClose} style={styles.container}>
        <View style={styles.modalContent}>
          <Image
            source={isSuccess ? successImage : failImage}
            style={styles.image}
          />
          <Text style={styles.text}>
            {isSuccess
              ? "Success! Your inquiry has been submitted"
              : "Error! Your inquiry has not been submitted"}
          </Text>
          {!isSuccess && (
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.retryText}>Try Again</Text>
            </TouchableOpacity>
          )}
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: width * 0.8,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontFamily: "Open Sans Bold",
    color: "#9A9A9A",
    textAlign: "center",
    marginBottom: 20,
  },
  retryText: {
    fontSize: 24,
    fontFamily: "Open Sans Bold",
    color: "#0A84FF",
  },
});

export default SuccessFailModal;
