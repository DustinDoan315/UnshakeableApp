import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import { StripeProvider } from "@stripe/stripe-react-native";

const { width, height } = Dimensions.get("window");

const SubscriptionScreen = () => {
  return (
    <StripeProvider publishableKey="your-publishable-key">
      <ScrollView style={styles.container}>
        {/* <Image
          source={require("../assets/Unshakeable_Full_Color_Logomark Minus_Text@3x.png")}
          style={styles.logo}
        /> */}
        <View style={styles.planBox}>
          <Text style={styles.planTitle}>Basic Plan</Text>
          <Text style={styles.planCost}>$9.99/month</Text>
          <Text style={styles.planFeature}>Personalized Avatar Creation</Text>
          <Text style={styles.planFeature}>Basic Color Profile</Text>
          <Text style={styles.planFeature}>Basic Style Advice</Text>
          <Text style={styles.planFeature}>
            Limited Virtual Stylist Sessions
          </Text>
          <Text style={styles.planFeature}>
            Curated Apparel Recommendations
          </Text>
          <Text style={styles.planFeature}>Community Access</Text>
          <TouchableOpacity style={styles.subscribeButton}>
            <Text style={styles.subscribeButtonText}>Subscribe</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.planBox}>
          <Text style={styles.planTitle}>Premium Plan</Text>
          <Text style={styles.planCost}>$17.99/month</Text>
          <Text style={styles.planFeature}>All Basic Plan Features</Text>
          <Text style={styles.planFeature}>Advanced Color Analysis</Text>
          <Text style={styles.planFeature}>
            Unlimited Virtual Stylist Sessions
          </Text>
          <Text style={styles.planFeature}>Enhanced Style Advice</Text>
          <Text style={styles.planFeature}>Priority Support</Text>
          <Text style={styles.planFeature}>Exclusive Content</Text>
          <Text style={styles.planFeature}>Discounts and Offers</Text>
          <TouchableOpacity style={styles.subscribeButton}>
            <Text style={styles.subscribeButtonText}>Subscribe</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.planBox}>
          <Text style={styles.planTitle}>Annual Plan</Text>
          <Text style={styles.planCost}>$99.99/year</Text>
          <Text style={styles.planFeature}>All Premium Plan Features</Text>
          <Text style={styles.planFeature}>Yearly Savings</Text>
          <Text style={styles.planFeature}>Annual Color Profile Update</Text>
          <Text style={styles.planFeature}>Exclusive Annual Events</Text>
          <Text style={styles.planFeature}>Gift Subscriptions</Text>
          <Text style={styles.planFeature}>Early Access</Text>
          <Text style={styles.planFeature}>Special Recognition</Text>
          <TouchableOpacity style={styles.subscribeButton}>
            <Text style={styles.subscribeButtonText}>Subscribe</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#262626",
  },
  logo: {
    width: 227,
    height: 227,
    alignSelf: "center",
    marginVertical: 20,
  },
  planBox: {
    width: 258,
    alignSelf: "center",
    backgroundColor: "#262626",
    borderColor: "#FFFFFF",
    borderWidth: 3,
    marginBottom: 20,
    padding: 20,
  },
  planTitle: {
    fontFamily: "Open Sans Bold",
    fontSize: 24,
    color: "#FFFFFF",
    marginBottom: 10,
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
    width: 110,
    height: 44,
    backgroundColor: "#1375C1",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
  },
  subscribeButtonText: {
    fontFamily: "Open Sans Bold",
    fontSize: 18,
    color: "#FFFFFF",
  },
});

export default SubscriptionScreen;
