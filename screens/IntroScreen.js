import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Video from "react-native-video";
import { useNavigation } from "@react-navigation/native";

const IntroScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Subscription");
    }, 5000); // Duration of the video in milliseconds
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* <Video
        source={require("../assets/57.MP4")}
        style={styles.video}
        resizeMode="cover"
        onEnd={() => navigation.replace("Subscription")}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  video: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default IntroScreen;
