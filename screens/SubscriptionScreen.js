import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import { StripeProvider } from "@stripe/stripe-react-native";
import { ResizeMode, Video } from "expo-av";
import CustomHeader from "../components/CustomHeader";
import Logo from "../components/Logo";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const videoSource = require("../assets/1min.mp4");

const plans = [
  {
    id: "1",
    title: "Basic Plan",
    cost: "$9.99/month",
    features: [
      "Personalized Avatar Creation",
      "Basic Color Profile",
      "Basic Style Advice",
      "Limited Virtual Stylist Sessions",
      "Curated Apparel Recommendations",
      "Community Access",
    ],
  },
  {
    id: "2",
    title: "Premium Plan",
    cost: "$17.99/month",
    features: [
      "All Basic Plan Features",
      "Advanced Color Analysis",
      "Unlimited Virtual Stylist Sessions",
      "Enhanced Style Advice",
      "Priority Support",
      "Exclusive Content",
      "Discounts and Offers",
    ],
  },
  {
    id: "3",
    title: "Annual Plan",
    cost: "$99.99/year",
    features: [
      "All Premium Plan Features",
      "Yearly Savings",
      "Annual Color Profile Update",
      "Exclusive Annual Events",
      "Gift Subscriptions",
      "Early Access",
      "Special Recognition",
    ],
  },
];

const SubscriptionScreen = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  const videoRef = useRef(null);

  const startPlayback = async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.playAsync();
      } catch (error) {
        console.error("Error starting video playback:", error);
      }
    }
  };

  React.useEffect(() => {
    startPlayback();
  }, []);

  const onScroll = useCallback((event) => {
    const index = Math.floor(
      event.nativeEvent.contentOffset.x / (width * 0.75)
    );
    setActiveIndex(index);
  }, []);

  const subscribe = (index) => {
    Alert.alert(`You subscribed to Item ${index + 1}`);
    navigation.navigate("Home");
  };

  const renderItem = ({ item, index }) => (
    <View
      style={[
        styles.planBox,
        {
          borderColor: activeIndex === index ? "#FFFFFF" : "#9A9A9A",
        },
      ]}>
      {index === 0 && (
        <View style={styles.popularTag}>
          <Text style={styles.popularTagText}>MOST POPULAR</Text>
        </View>
      )}
      <Text style={styles.planTitle}>{item.title}</Text>
      <Text style={styles.planCost}>{item.cost}</Text>
      {item.features.map((feature, idx) => (
        <Text key={idx} style={styles.planFeature}>
          {feature}
        </Text>
      ))}
      <LinearGradient
        colors={["#1375C1", "#61AEE9"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.subscribeButton}>
        <TouchableOpacity
          onPress={() => subscribe(index)}
          style={styles.subscribeButtonInner}>
          <Text style={styles.subscribeButtonText}>Subscribe</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );

  return (
    <StripeProvider publishableKey="your-publishable-key">
      <View style={styles.container}>
        <CustomHeader />

        <Video
          ref={videoRef}
          source={videoSource}
          style={styles.video}
          resizeMode={ResizeMode.CONTAIN}
          isLooping
        />
        <Logo />
        <FlatList
          ref={flatListRef}
          data={plans}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          onScroll={onScroll}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
        />
        <View style={styles.needHelp}>
          <Text style={styles.needHelpText}>Need help?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("ContactUs")}>
            <Text style={styles.needHelpBtn}>Contact Us</Text>
          </TouchableOpacity>
        </View>
      </View>
    </StripeProvider>
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
    bottom: 0,
    alignSelf: "center",
  },
  planBox: {
    width: width * 0.75,
    alignSelf: "center",
    borderRadius: 20,
    backgroundColor: "#262626",
    borderWidth: 3,
    marginBottom: 20,
    padding: 20,
    marginHorizontal: 10,
  },
  planTitle: {
    fontFamily: "Open Sans Bold",
    fontSize: 24,
    color: "#FFFFFF",
    marginVertical: 10,
  },
  planCost: {
    fontFamily: "Open Sans Bold",
    fontSize: 30,
    color: "#FFFFFF",
    marginBottom: 20,
  },
  planFeature: {
    fontFamily: "Open Sans Regular",
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 5,
  },
  subscribeButton: {
    width: "100%",
    borderRadius: 8,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  subscribeButtonInner: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  subscribeButtonText: {
    fontFamily: "Open Sans Bold",
    fontSize: 18,
    color: "#FFFFFF",
  },
  flatListContent: {
    paddingTop: 20,
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
    marginLeft: 10,
  },
  popularTag: {
    position: "absolute",
    top: -15,
    width: 150,
    alignSelf: "center",
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  popularTagText: {
    fontSize: 12,
    color: "black",
  },
});

export default SubscriptionScreen;
