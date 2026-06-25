import { ScrollView, Text, View, Pressable, RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import { useColors } from "@/hooks/use-colors";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useState } from "react";

interface QuickAction {
  id: string;
  label: string;
  description: string;
  icon: "doc.text.fill" | "chevron.left.forwardslash.chevron.right" | "photo.fill" | "hammer.fill";
  route: string;
  color: string;
}

export default function HomeScreen() {
  const router = useRouter();
  const colors = useColors();
  const [refreshing, setRefreshing] = useState(false);

  const quickActions: QuickAction[] = [
    {
      id: "metadata",
      label: "Metadata",
      description: "Generate metadata for microstock",
      icon: "doc.text.fill",
      route: "/(tabs)/microstock",
      color: colors.primary,
    },
    {
      id: "code",
      label: "Code",
      description: "Generate & debug code",
      icon: "chevron.left.forwardslash.chevron.right",
      route: "/(tabs)/coding",
      color: colors.accent,
    },
    {
      id: "image",
      label: "Image",
      description: "Analyze & enhance images",
      icon: "photo.fill",
      route: "/(tabs)/image",
      color: colors.primary,
    },
    {
      id: "task",
      label: "Task",
      description: "Solve complex tasks",
      icon: "hammer.fill",
      route: "/(tabs)/tasks",
      color: colors.accent,
    },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <ScreenContainer className="p-0">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View className="px-6 pt-6 pb-4">
          <Text
            className="text-3xl font-bold"
            style={{ color: colors.foreground }}
          >
            Welcome Back
          </Text>
          <Text
            className="text-sm mt-1"
            style={{ color: colors.muted }}
          >
            ♊ ZoinSofyan Assistant
          </Text>
        </View>

        {/* Quick Actions Grid */}
        <View className="px-6 pb-6">
          <Text
            className="text-lg font-semibold mb-4"
            style={{ color: colors.foreground }}
          >
            Quick Actions
          </Text>

          <View className="gap-4">
            {/* First Row */}
            <View className="flex-row gap-4">
              {quickActions.slice(0, 2).map((action) => (
                <Pressable
                  key={action.id}
                  onPress={() => router.push(action.route)}
                  className="flex-1 rounded-2xl p-4 items-center justify-center"
                  style={({ pressed }) => [
                    {
                      backgroundColor: colors.surface,
                      opacity: pressed ? 0.8 : 1,
                      transform: [{ scale: pressed ? 0.95 : 1 }],
                    },
                  ]}
                >
                  <View
                    className="w-12 h-12 rounded-full items-center justify-center mb-2"
                    style={{ backgroundColor: action.color + "20" }}
                  >
                    <IconSymbol
                      name={action.icon}
                      size={24}
                      color={action.color}
                    />
                  </View>
                  <Text
                    className="text-sm font-semibold text-center"
                    style={{ color: colors.foreground }}
                  >
                    {action.label}
                  </Text>
                  <Text
                    className="text-xs text-center mt-1"
                    style={{ color: colors.muted }}
                  >
                    {action.description}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* Second Row */}
            <View className="flex-row gap-4">
              {quickActions.slice(2, 4).map((action) => (
                <Pressable
                  key={action.id}
                  onPress={() => router.push(action.route)}
                  className="flex-1 rounded-2xl p-4 items-center justify-center"
                  style={({ pressed }) => [
                    {
                      backgroundColor: colors.surface,
                      opacity: pressed ? 0.8 : 1,
                      transform: [{ scale: pressed ? 0.95 : 1 }],
                    },
                  ]}
                >
                  <View
                    className="w-12 h-12 rounded-full items-center justify-center mb-2"
                    style={{ backgroundColor: action.color + "20" }}
                  >
                    <IconSymbol
                      name={action.icon}
                      size={24}
                      color={action.color}
                    />
                  </View>
                  <Text
                    className="text-sm font-semibold text-center"
                    style={{ color: colors.foreground }}
                  >
                    {action.label}
                  </Text>
                  <Text
                    className="text-xs text-center mt-1"
                    style={{ color: colors.muted }}
                  >
                    {action.description}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        {/* Recent Activity Section */}
        <View className="px-6 pb-6">
          <Text
            className="text-lg font-semibold mb-4"
            style={{ color: colors.foreground }}
          >
            Recent Activity
          </Text>

          <View
            className="rounded-2xl p-4"
            style={{ backgroundColor: colors.surface }}
          >
            <Text
              className="text-sm text-center"
              style={{ color: colors.muted }}
            >
              No recent activity yet. Start by using one of the quick actions above!
            </Text>
          </View>
        </View>

        {/* Statistics Section */}
        <View className="px-6 pb-8">
          <Text
            className="text-lg font-semibold mb-4"
            style={{ color: colors.foreground }}
          >
            Statistics
          </Text>

          <View className="gap-3">
            <View
              className="flex-row justify-between p-4 rounded-xl"
              style={{ backgroundColor: colors.surface }}
            >
              <Text
                className="text-sm"
                style={{ color: colors.muted }}
              >
                Metadata Generated
              </Text>
              <Text
                className="text-lg font-bold"
                style={{ color: colors.primary }}
              >
                0
              </Text>
            </View>

            <View
              className="flex-row justify-between p-4 rounded-xl"
              style={{ backgroundColor: colors.surface }}
            >
              <Text
                className="text-sm"
                style={{ color: colors.muted }}
              >
                Code Snippets
              </Text>
              <Text
                className="text-lg font-bold"
                style={{ color: colors.accent }}
              >
                0
              </Text>
            </View>

            <View
              className="flex-row justify-between p-4 rounded-xl"
              style={{ backgroundColor: colors.surface }}
            >
              <Text
                className="text-sm"
                style={{ color: colors.muted }}
              >
                Images Analyzed
              </Text>
              <Text
                className="text-lg font-bold"
                style={{ color: colors.primary }}
              >
                0
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
