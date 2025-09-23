// components/WelcomeSection.js
import LottieView from "lottie-react-native";
import React from "react";
import { View } from "react-native";

export default function WelcomeSection() {
  return (
    <View className="w-[100%]">
      {/* <View className="py-4">
        <Text className="text-title text-center font-bold text-3xl mb-2">
          Welcome to YatraQ
        </Text>
        <Text className="text-body text-center text-sm">
          Track buses in real-time
        </Text>
      </View> */}

      {/* Bus animation */}
      <View className="items-center">
        <LottieView
          source={require("../assets/animations/bus.json")}
          autoPlay
          loop
          style={{ width: 500, height: 350 }}
          speed={1}
        />
      </View>
    </View>
  );
}
