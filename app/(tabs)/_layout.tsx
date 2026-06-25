import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Platform, View } from "react-native";
import { useColors } from "@/hooks/use-colors";
import { FloatingWidget } from "@/components/floating-widget";
import { useState } from "react";

export default function TabLayout() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [showFloatingWidget, setShowFloatingWidget] = useState(true);
  const bottomPadding = Platform.OS === "web" ? 12 : Math.max(insets.bottom, 8);
  const tabBarHeight = 56 + bottomPadding;

  return (
    <View className="flex-1">
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarStyle: {
            paddingTop: 8,
            paddingBottom: bottomPadding,
            height: tabBarHeight,
            backgroundColor: colors.background,
            borderTopColor: colors.border,
            borderTopWidth: 0.5,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="coding"
          options={{
            title: "Coding",
            tabBarIcon: ({ color }) => (
              <IconSymbol
                size={28}
                name="chevron.left.forwardslash.chevron.right"
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="microstock"
          options={{
            title: "Microstock",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="doc.text.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="image"
          options={{
            title: "Image",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="photo.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="gear.fill" color={color} />
            ),
          }}
        />
      </Tabs>
      <FloatingWidget visible={showFloatingWidget} />
    </View>
  );
}
