import React, { useEffect } from "react";
import { View, Text, Animated } from "react-native";
import { useRouter } from "expo-router";
import { useColors } from "@/hooks/use-colors";

export default function SplashScreen() {
  const router = useRouter();
  const colors = useColors();
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;
  const opacityAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate splash screen
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to home after 2.5 seconds
    const timer = setTimeout(() => {
      router.replace("/(tabs)");
    }, 2500);

    return () => clearTimeout(timer);
  }, [router, scaleAnim, opacityAnim]);

  return (
    <View
      className="flex-1 items-center justify-center"
      style={{
        backgroundColor: colors.background,
      }}
    >
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        }}
      >
        <Text
          style={{
            fontSize: 80,
            marginBottom: 20,
          }}
        >
          ♊
        </Text>
        <Text
          className="text-2xl font-bold text-center"
          style={{ color: colors.foreground }}
        >
          ZoinSofyan
        </Text>
        <Text
          className="text-base text-center mt-2"
          style={{ color: colors.muted }}
        >
          Assistant
        </Text>
      </Animated.View>
    </View>
  );
}
