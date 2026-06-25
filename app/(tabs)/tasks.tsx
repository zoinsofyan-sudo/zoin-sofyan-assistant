import { ScrollView, Text, View, TextInput, Pressable } from "react-native";
import { useColors } from "@/hooks/use-colors";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useState } from "react";

export default function TasksScreen() {
  const colors = useColors();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSolveTask = () => {
    if (!input.trim()) return;
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header */}
        <View className="px-6 pt-6 pb-4">
          <Text
            className="text-2xl font-bold"
            style={{ color: colors.foreground }}
          >
            Task Solver
          </Text>
          <Text
            className="text-sm mt-1"
            style={{ color: colors.muted }}
          >
            Get step-by-step solutions to complex tasks
          </Text>
        </View>

        {/* Input Area */}
        <View className="px-6 pb-4">
          <Text
            className="text-sm font-semibold mb-2"
            style={{ color: colors.foreground }}
          >
            Describe Your Task
          </Text>
          <TextInput
            placeholder="Enter a complex task or problem..."
            placeholderTextColor={colors.muted}
            value={input}
            onChangeText={setInput}
            multiline
            numberOfLines={6}
            className="rounded-lg p-3 border"
            style={{
              backgroundColor: colors.surface,
              color: colors.foreground,
              borderColor: colors.border,
              borderWidth: 1,
            }}
          />
        </View>

        {/* AI Provider Info */}
        <View className="px-6 pb-4">
          <View
            className="p-4 rounded-lg flex-row items-center gap-3"
            style={{ backgroundColor: colors.surface }}
          >
            <IconSymbol
              name="info.circle.fill"
              size={20}
              color={colors.primary}
            />
            <View className="flex-1">
              <Text
                className="text-sm font-semibold"
                style={{ color: colors.foreground }}
              >
                AI-Powered Solutions
              </Text>
              <Text
                className="text-xs mt-1"
                style={{ color: colors.muted }}
              >
                Get detailed explanations and step-by-step guidance
              </Text>
            </View>
          </View>
        </View>

        {/* Solve Button */}
        <View className="px-6 pb-8">
          <Pressable
            onPress={handleSolveTask}
            disabled={!input.trim() || loading}
            className="py-3 rounded-lg items-center justify-center flex-row gap-2"
            style={({ pressed }) => [
              {
                backgroundColor:
                  !input.trim() || loading ? colors.muted : colors.primary,
                opacity: pressed ? 0.9 : 1,
                transform: [{ scale: pressed ? 0.98 : 1 }],
              },
            ]}
          >
            <IconSymbol
              name="sparkles"
              size={20}
              color="#fff"
            />
            <Text className="text-base font-bold text-white">
              {loading ? "Solving..." : "Solve Task"}
            </Text>
          </Pressable>
        </View>

        {/* Recent Tasks */}
        <View className="px-6 pb-8">
          <Text
            className="text-lg font-semibold mb-4"
            style={{ color: colors.foreground }}
          >
            Recent Tasks
          </Text>
          <View
            className="rounded-lg p-4"
            style={{ backgroundColor: colors.surface }}
          >
            <Text
              className="text-sm text-center"
              style={{ color: colors.muted }}
            >
              No recent tasks yet. Start by entering a task above!
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
