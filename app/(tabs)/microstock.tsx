import { ScrollView, Text, View, TextInput, Pressable } from "react-native";
import { useColors } from "@/hooks/use-colors";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useState } from "react";

const PLATFORMS = [
  "Pinterest",
  "Adobe Stock",
  "Shutterstock",
  "iStock",
  "Getty Images",
  "Dreamtime",
  "123RF",
  "Bigstock",
  "Depositphotos",
  "Freepik",
  "CanStockPhoto",
  "VectorStock",
  "Pixabay",
  "Unsplash",
  "Pexels",
];

export default function MicrostockScreen() {
  const colors = useColors();
  const [platform, setPlatform] = useState("Pinterest");
  const [description, setDescription] = useState("");
  const [batchMode, setBatchMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    if (!description.trim()) return;
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
            Microstock Metadata
          </Text>
          <Text
            className="text-sm mt-1"
            style={{ color: colors.muted }}
          >
            Generate metadata for 50+ platforms
          </Text>
        </View>

        {/* Platform Selector */}
        <View className="px-6 pb-4">
          <Text
            className="text-sm font-semibold mb-2"
            style={{ color: colors.foreground }}
          >
            Select Platform
          </Text>
          <View
            className="rounded-lg p-3 border"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderWidth: 1,
            }}
          >
            <Text
              style={{ color: colors.foreground }}
            >
              {platform}
            </Text>
          </View>
          <View className="mt-2 flex-row flex-wrap gap-2">
            {PLATFORMS.slice(0, 5).map((p) => (
              <Pressable
                key={p}
                onPress={() => setPlatform(p)}
                className="px-3 py-2 rounded-lg"
                style={({ pressed }) => [
                  {
                    backgroundColor:
                      platform === p ? colors.primary : colors.surface,
                    opacity: pressed ? 0.8 : 1,
                  },
                ]}
              >
                <Text
                  className="text-xs font-semibold"
                  style={{
                    color: platform === p ? "#fff" : colors.foreground,
                  }}
                >
                  {p}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Image Upload Area */}
        <View className="px-6 pb-4">
          <Text
            className="text-sm font-semibold mb-2"
            style={{ color: colors.foreground }}
          >
            Upload Image
          </Text>
          <View
            className="border-2 border-dashed rounded-lg p-6 items-center justify-center"
            style={{ borderColor: colors.border }}
          >
            <IconSymbol
              name="photo.fill"
              size={32}
              color={colors.muted}
            />
            <Text
              className="text-sm font-semibold mt-2"
              style={{ color: colors.foreground }}
            >
              Tap to upload image
            </Text>
            <Text
              className="text-xs mt-1"
              style={{ color: colors.muted }}
            >
              or select from gallery
            </Text>
          </View>
        </View>

        {/* Description Input */}
        <View className="px-6 pb-4">
          <Text
            className="text-sm font-semibold mb-2"
            style={{ color: colors.foreground }}
          >
            Image Description (Optional)
          </Text>
          <TextInput
            placeholder="Describe your image..."
            placeholderTextColor={colors.muted}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            className="rounded-lg p-3 border"
            style={{
              backgroundColor: colors.surface,
              color: colors.foreground,
              borderColor: colors.border,
              borderWidth: 1,
            }}
          />
        </View>

        {/* Batch Mode Toggle */}
        <View className="px-6 pb-4 flex-row items-center justify-between">
          <Text
            className="text-sm font-semibold"
            style={{ color: colors.foreground }}
          >
            Batch Processing
          </Text>
          <Pressable
            onPress={() => setBatchMode(!batchMode)}
            className="w-12 h-7 rounded-full items-center justify-center"
            style={{
              backgroundColor: batchMode ? colors.primary : colors.surface,
            }}
          >
            <View
              className="w-6 h-6 rounded-full"
              style={{
                backgroundColor: "#fff",
                transform: [{ translateX: batchMode ? 8 : -8 }],
              }}
            />
          </Pressable>
        </View>

        {/* Generate Button */}
        <View className="px-6 pb-8">
          <Pressable
            onPress={handleGenerate}
            disabled={!description.trim() || loading}
            className="py-3 rounded-lg items-center justify-center flex-row gap-2"
            style={({ pressed }) => [
              {
                backgroundColor:
                  !description.trim() || loading ? colors.muted : colors.primary,
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
              {loading ? "Generating..." : "Generate Metadata"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
