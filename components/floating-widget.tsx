import React, { useState } from "react";
import { View, Pressable, Text, Animated } from "react-native";
import { useRouter } from "expo-router";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { cn } from "@/lib/utils";

interface FloatingWidgetProps {
  visible?: boolean;
}

export function FloatingWidget({ visible = true }: FloatingWidgetProps) {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const colors = useColors();
  const scaleAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: expanded ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [expanded, scaleAnim]);

  if (!visible) return null;

  const menuItems = [
    {
      label: "Metadata",
      icon: "doc.text.fill" as const,
      onPress: () => {
        setExpanded(false);
        router.push("/(tabs)/microstock");
      },
    },
    {
      label: "Code",
      icon: "chevron.left.forwardslash.chevron.right" as const,
      onPress: () => {
        setExpanded(false);
        router.push("/(tabs)/coding");
      },
    },
    {
      label: "Image",
      icon: "photo.fill" as const,
      onPress: () => {
        setExpanded(false);
        router.push("/(tabs)/image");
      },
    },
    {
      label: "Task",
      icon: "hammer.fill" as const,
      onPress: () => {
        setExpanded(false);
        router.push("/(tabs)/tasks");
      },
    },
  ];

  return (
    <View className="absolute bottom-24 right-6 z-50">
      {/* Menu Items */}
      {menuItems.map((item, index) => (
        <Animated.View
          key={item.label}
          style={{
            opacity: scaleAnim,
            transform: [
              {
                translateY: scaleAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -(index + 1) * 60],
                }),
              },
            ],
          }}
        >
          <Pressable
            onPress={item.onPress}
            className="mb-3 flex-row items-center gap-3"
            style={({ pressed }) => [
              { opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <View
              className="rounded-full p-3"
              style={{ backgroundColor: colors.surface }}
            >
              <IconSymbol
                name={item.icon}
                size={20}
                color={colors.primary}
              />
            </View>
            <View
              className="px-3 py-2 rounded-lg"
              style={{ backgroundColor: colors.surface }}
            >
              <Text
                className="text-sm font-medium"
                style={{ color: colors.foreground }}
              >
                {item.label}
              </Text>
            </View>
          </Pressable>
        </Animated.View>
      ))}

      {/* Main FAB */}
      <Pressable
        onPress={() => setExpanded(!expanded)}
        className="w-14 h-14 rounded-full items-center justify-center shadow-lg"
        style={({ pressed }) => [
          {
            backgroundColor: colors.primary,
            opacity: pressed ? 0.9 : 1,
            transform: [{ scale: pressed ? 0.95 : 1 }],
          },
        ]}
      >
        <Text style={{ fontSize: 24 }}>
          {expanded ? "✕" : "♊"}
        </Text>
      </Pressable>
    </View>
  );
}
