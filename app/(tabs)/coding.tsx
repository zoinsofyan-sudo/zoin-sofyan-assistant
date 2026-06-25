import { ScrollView, Text, View, TextInput, Pressable } from "react-native";
import { useColors } from "@/hooks/use-colors";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useState } from "react";

type CodingMode = "generate" | "debug" | "explain";

const LANGUAGES = ["JavaScript", "Python", "TypeScript", "Java", "C++", "Go", "Rust"];
const AI_PROVIDERS = ["Gemini", "Qwen", "Claude", "Deepseek", "Groq"];

export default function CodingScreen() {
  const colors = useColors();
  const [mode, setMode] = useState<CodingMode>("generate");
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("JavaScript");
  const [provider, setProvider] = useState("Gemini");
  const [loading, setLoading] = useState(false);

  const modes = [
    { id: "generate", label: "Generate", icon: "sparkles" as const },
    { id: "debug", label: "Debug", icon: "hammer.fill" as const },
    { id: "explain", label: "Explain", icon: "doc.text.fill" as const },
  ];

  const handleGenerate = () => {
    if (!input.trim()) return;
    setLoading(true);
    // Simulate API call
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
            Coding Tools
          </Text>
          <Text
            className="text-sm mt-1"
            style={{ color: colors.muted }}
          >
            Generate, debug, and explain code
          </Text>
        </View>

        {/* Mode Selector */}
        <View className="px-6 pb-4">
          <View className="flex-row gap-2">
            {modes.map((m) => (
              <Pressable
                key={m.id}
                onPress={() => setMode(m.id as CodingMode)}
                className="flex-1 flex-row items-center justify-center gap-2 py-2 px-3 rounded-lg"
                style={({ pressed }) => [
                  {
                    backgroundColor:
                      mode === m.id ? colors.primary : colors.surface,
                    opacity: pressed ? 0.8 : 1,
                  },
                ]}
              >
                <IconSymbol
                  name={m.icon}
                  size={16}
                  color={mode === m.id ? "#fff" : colors.foreground}
                />
                <Text
                  className="text-sm font-semibold"
                  style={{
                    color: mode === m.id ? "#fff" : colors.foreground,
                  }}
                >
                  {m.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Input Area */}
        <View className="px-6 pb-4">
          <Text
            className="text-sm font-semibold mb-2"
            style={{ color: colors.foreground }}
          >
            {mode === "generate"
              ? "Describe what you want to code"
              : mode === "debug"
                ? "Paste code to debug"
                : "Paste code to explain"}
          </Text>
          <TextInput
            placeholder="Enter your request..."
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
              fontFamily: "monospace",
            }}
          />
        </View>

        {/* Language Selector */}
        <View className="px-6 pb-4">
          <Text
            className="text-sm font-semibold mb-2"
            style={{ color: colors.foreground }}
          >
            Language
          </Text>
          <View
            className="flex-row flex-wrap gap-2"
          >
            {LANGUAGES.map((lang) => (
              <Pressable
                key={lang}
                onPress={() => setLanguage(lang)}
                className="px-3 py-2 rounded-lg"
                style={({ pressed }) => [
                  {
                    backgroundColor:
                      language === lang ? colors.primary : colors.surface,
                    opacity: pressed ? 0.8 : 1,
                  },
                ]}
              >
                <Text
                  className="text-xs font-semibold"
                  style={{
                    color: language === lang ? "#fff" : colors.foreground,
                  }}
                >
                  {lang}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* AI Provider Selector */}
        <View className="px-6 pb-4">
          <Text
            className="text-sm font-semibold mb-2"
            style={{ color: colors.foreground }}
          >
            AI Provider
          </Text>
          <View
            className="flex-row flex-wrap gap-2"
          >
            {AI_PROVIDERS.map((p) => (
              <Pressable
                key={p}
                onPress={() => setProvider(p)}
                className="px-3 py-2 rounded-lg"
                style={({ pressed }) => [
                  {
                    backgroundColor:
                      provider === p ? colors.accent : colors.surface,
                    opacity: pressed ? 0.8 : 1,
                  },
                ]}
              >
                <Text
                  className="text-xs font-semibold"
                  style={{
                    color: provider === p ? "#fff" : colors.foreground,
                  }}
                >
                  {p}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Generate Button */}
        <View className="px-6 pb-8">
          <Pressable
            onPress={handleGenerate}
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
              {loading ? "Generating..." : "Generate"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
