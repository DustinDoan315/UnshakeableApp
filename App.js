import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import SignUpScreen from "./screens/SignUpScreen";
import SubscriptionScreen from "./screens/SubscriptionScreen";
import LoginScreen from "./screens/LoginScreen";
import MultiFactorAuthScreen from "./screens/MultiFactorAuthScreen";
import PasswordResetScreen from "./screens/PasswordResetScreen";
import ForgotPasswordScreen1 from "./screens/ForgotPasswordScreen1";
import ForgotPasswordScreen2 from "./screens/ForgotPasswordScreen2";
import ContactUsScreen from "./screens/ContactUsScreen";
import { SafeAreaView, StatusBar } from "react-native";
import AuthenticationScreen1 from "./screens/AuthenticationScreen1";
import AuthenticationScreen2 from "./screens/AuthenticationScreen2";

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
      }}>
      <StatusBar backgroundColor={"transparent"} barStyle={"light-content"} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Subscription" component={SubscriptionScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />

          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Auth1" component={AuthenticationScreen1} />
          <Stack.Screen name="Auth2" component={AuthenticationScreen2} />
          <Stack.Screen
            name="MultiFactorAuth"
            component={MultiFactorAuthScreen}
          />
          <Stack.Screen name="PasswordReset" component={PasswordResetScreen} />
          <Stack.Screen
            name="ForgotPassword1"
            component={ForgotPasswordScreen1}
          />
          <Stack.Screen
            name="ForgotPassword2"
            component={ForgotPasswordScreen2}
          />
          <Stack.Screen name="ContactUs" component={ContactUsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
