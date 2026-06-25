import { ScrollView, Text, View, Pressable } from "react-native";
import { useColors } from "@/hooks/use-colors";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useState } from "react";

type ImageMode = "prompts" | "analyze" | "suggestions";

export default function ImageScreen() {
  const colors = useColors();
  const [mode, setMode] = useState<ImageMode>("prompts");
  const [loading, setLoading] = useState(false);

  const modes = [
    {
      id: "prompts",
      label: "Prompts",
      icon: "sparkles" as const,
      description: "Generate detailed image prompts",
    },
    {
      id: "analyze",
      label: "Analyze",
      icon: "photo.fill" as const,
      description: "Analyze and describe images",
    },
    {
      id: "suggestions",
      label: "Suggestions",
      icon: "hammer.fill" as const,
      description: "Get editing suggestions",
    },
  ];

  const handleProcess = () => {
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
            Image Tools
          </Text>
          <Text
            className="text-sm mt-1"
            style={{ color: colors.muted }}
          >
            Generate prompts, analyze, and enhance images
          </Text>
        </View>

        {/* Mode Selector */}
        <View className="px-6 pb-6">
          <View className="gap-3">
            {modes.map((m) => (
              <Pressable
                key={m.id}
                onPress={() => setMode(m.id as ImageMode)}
                className="p-4 rounded-2xl flex-row items-center gap-4"
                style={({ pressed }) => [
                  {
                    backgroundColor:
                      mode === m.id ? colors.primary : colors.surface,
                    opacity: pressed ? 0.8 : 1,
                  },
                ]}
              >
                <View
                  className="w-12 h-12 rounded-full items-center justify-center"
                  style={{
                    backgroundColor:
                      mode === m.id ? "rgba(255,255,255,0.2)" : colors.border,
                  }}
                >
                  <IconSymbol
                    name={m.icon}
                    size={24}
                    color={mode === m.id ? "#fff" : colors.foreground}
                  />
                </View>
                <View className="flex-1">
                  <Text
                    className="text-base font-semibold"
                    style={{
                      color: mode === m.id ? "#fff" : colors.foreground,
                    }}
                  >
                    {m.label}
                  </Text>
                  <Text
                    className="text-xs mt-1"
                    style={{
                      color:
                        mode === m.id
                          ? "rgba(255,255,255,0.7)"
                          : colors.muted,
                    }}
                  >
                    {m.description}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Upload Area */}
        <View className="px-6 pb-4">
          <Text
            className="text-sm font-semibold mb-2"
            style={{ color: colors.foreground }}
          >
            {mode === "prompts"
              ? "Describe the image you want"
              : "Upload or select image"}
          </Text>
          <View
            className="border-2 border-dashed rounded-lg p-8 items-center justify-center"
            style={{ borderColor: colors.border }}
          >
            <IconSymbol
              name="photo.fill"
              size={40}
              color={colors.muted}
            />
            <Text
              className="text-sm font-semibold mt-3"
              style={{ color: colors.foreground }}
            >
              {mode === "prompts"
                ? "Enter description"
                : "Tap to upload image"}
            </Text>
            <Text
              className="text-xs mt-1 text-center"
              style={{ color: colors.muted }}
            >
              {mode === "prompts"
                ? "Describe what you want to generate"
                : "Select from gallery or camera"}
            </Text>
          </View>
        </View>

        {/* Action Button */}
        <View className="px-6 pb-8">
          <Pressable
            onPress={handleProcess}
            disabled={loading}
            className="py-3 rounded-lg items-center justify-center flex-row gap-2"
            style={({ pressed }) => [
              {
                backgroundColor: loading ? colors.muted : colors.primary,
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
              {loading
                ? "Processing..."
                : mode === "prompts"
                  ? "Generate Prompts"
                  : mode === "analyze"
                    ? "Analyze Image"
                    : "Get Suggestions"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
