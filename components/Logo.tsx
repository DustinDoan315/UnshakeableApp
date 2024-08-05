import { View, Image } from "react-native";
import React from "react";
import { assets } from "../assets";

const Logo = ({ marginBottom, marginTop }: any) => {
  return (
    <View>
      <Image
        resizeMode="contain"
        source={assets.logo_without_text}
        style={{
          alignSelf: "center",
          width: 275,
          height: 225,
          marginBottom: marginBottom || 0,
          marginTop: marginTop || 0,
        }}
      />
    </View>
  );
};

export default Logo;
