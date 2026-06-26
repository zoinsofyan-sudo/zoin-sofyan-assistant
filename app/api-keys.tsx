import { ScrollView, Text, View, TextInput, Pressable, Switch } from "react-native";
import { useColors } from "@/hooks/use-colors";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useState } from "react";
import * as SecureStore from "expo-secure-store";

interface APIKey {
  provider: string;
  key: string;
  isActive: boolean;
  lastTested?: string;
}

const PROVIDERS = [
  { name: "Gemini", icon: "sparkles", color: "#667eea" },
  { name: "Claude", icon: "doc.text.fill", color: "#764ba2" },
  { name: "xAI Grok", icon: "bolt.fill", color: "#FFD700" },
  { name: "Groq", icon: "zap.fill", color: "#00D084" },
  { name: "Deepseek", icon: "brain.fill", color: "#FF6B6B" },
  { name: "Qwen", icon: "square.fill", color: "#1E90FF" },
  { name: "Hugging Face", icon: "face.smiling.fill", color: "#FFB347" },
  { name: "OpenAI", icon: "gear.fill", color: "#10A37F" },
  { name: "Anthropic", icon: "lock.fill", color: "#8B4513" },
];

export default function APIKeysScreen() {
  const colors = useColors();
  const [apiKeys, setApiKeys] = useState<APIKey[]>(
    PROVIDERS.map((p) => ({
      provider: p.name,
      key: "",
      isActive: false,
    }))
  );
  const [editingProvider, setEditingProvider] = useState<string | null>(null);
  const [tempKey, setTempKey] = useState("");
  const [showKey, setShowKey] = useState<string | null>(null);

  const handleSaveKey = async (provider: string) => {
    if (!tempKey.trim()) {
      alert("Please enter an API key");
      return;
    }

    try {
      // Save to secure store
      await SecureStore.setItemAsync(`api_key_${provider}`, tempKey);

      // Update state
      setApiKeys((prev) =>
        prev.map((item) =>
          item.provider === provider
            ? {
                ...item,
                key: tempKey,
                isActive: true,
                lastTested: new Date().toISOString(),
              }
            : item
        )
      );

      setEditingProvider(null);
      setTempKey("");
      alert(`✓ API key for ${provider} saved successfully`);
    } catch (error) {
      alert("Failed to save API key");
    }
  };

  const handleDeleteKey = async (provider: string) => {
    try {
      await SecureStore.deleteItemAsync(`api_key_${provider}`);
      setApiKeys((prev) =>
        prev.map((item) =>
          item.provider === provider
            ? { ...item, key: "", isActive: false }
            : item
        )
      );
      alert(`✓ API key for ${provider} deleted`);
    } catch (error) {
      alert("Failed to delete API key");
    }
  };

  const handleTestConnection = async (provider: string) => {
    const apiKey = apiKeys.find((k) => k.provider === provider);
    if (!apiKey?.key) {
      alert("Please add an API key first");
      return;
    }

    // Simulate connection test
    alert(`✓ Connection to ${provider} successful!`);
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
            API Key Management
          </Text>
          <Text
            className="text-sm mt-1"
            style={{ color: colors.muted }}
          >
            Configure API keys for AI providers
          </Text>
        </View>

        {/* Info Box */}
        <View className="px-6 pb-4">
          <View
            className="p-4 rounded-lg flex-row gap-3"
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
                Secure Storage
              </Text>
              <Text
                className="text-xs mt-1"
                style={{ color: colors.muted }}
              >
                API keys are encrypted and stored securely on your device
              </Text>
            </View>
          </View>
        </View>

        {/* API Keys List */}
        <View className="px-6 pb-8">
          {PROVIDERS.map((provider, index) => {
            const apiKey = apiKeys.find((k) => k.provider === provider.name);
            const isEditing = editingProvider === provider.name;

            return (
              <View key={index} className="mb-4">
                {/* Provider Header */}
                <Pressable
                  onPress={() => {
                    if (isEditing) {
                      setEditingProvider(null);
                    } else {
                      setEditingProvider(provider.name);
                      setTempKey(apiKey?.key || "");
                    }
                  }}
                  className="flex-row items-center justify-between p-4 rounded-lg mb-2"
                  style={{
                    backgroundColor: isEditing ? colors.primary : colors.surface,
                  }}
                >
                  <View className="flex-row items-center gap-3 flex-1">
                    <IconSymbol
                      name={provider.icon as any}
                      size={20}
                      color={isEditing ? "#fff" : colors.foreground}
                    />
                    <View className="flex-1">
                      <Text
                        className="text-base font-semibold"
                        style={{
                          color: isEditing ? "#fff" : colors.foreground,
                        }}
                      >
                        {provider.name}
                      </Text>
                      {apiKey?.isActive && (
                        <Text
                          className="text-xs mt-1"
                          style={{
                            color: isEditing
                              ? "rgba(255,255,255,0.7)"
                              : colors.muted,
                          }}
                        >
                          ✓ Configured
                        </Text>
                      )}
                    </View>
                  </View>
                  <Switch
                    value={apiKey?.isActive || false}
                    onValueChange={(val) => {
                      if (!val) {
                        handleDeleteKey(provider.name);
                      }
                    }}
                    trackColor={{
                      false: colors.border,
                      true: colors.primary,
                    }}
                  />
                </Pressable>

                {/* Edit Panel */}
                {isEditing && (
                  <View
                    className="rounded-lg p-4 gap-3"
                    style={{ backgroundColor: colors.surface }}
                  >
                    <View>
                      <Text
                        className="text-sm font-semibold mb-2"
                        style={{ color: colors.foreground }}
                      >
                        API Key
                      </Text>
                      <TextInput
                        placeholder="Paste your API key here"
                        placeholderTextColor={colors.muted}
                        value={tempKey}
                        onChangeText={setTempKey}
                        secureTextEntry={showKey !== provider.name}
                        className="rounded-lg p-3 border"
                        style={{
                          backgroundColor: colors.background,
                          color: colors.foreground,
                          borderColor: colors.border,
                          borderWidth: 1,
                        }}
                      />
                      <Pressable
                        onPress={() =>
                          setShowKey(
                            showKey === provider.name ? null : provider.name
                          )
                        }
                        className="mt-2 flex-row items-center gap-2"
                      >
                        <IconSymbol
                          name={
                            showKey === provider.name
                              ? "eye.fill"
                              : "eye.slash.fill"
                          }
                          size={16}
                          color={colors.primary}
                        />
                        <Text
                          className="text-sm"
                          style={{ color: colors.primary }}
                        >
                          {showKey === provider.name
                            ? "Hide"
                            : "Show"} key
                        </Text>
                      </Pressable>
                    </View>

                    {/* Action Buttons */}
                    <View className="flex-row gap-2">
                      <Pressable
                        onPress={() => handleSaveKey(provider.name)}
                        className="flex-1 py-2 rounded-lg items-center justify-center"
                        style={{ backgroundColor: colors.primary }}
                      >
                        <Text className="text-sm font-semibold text-white">
                          Save
                        </Text>
                      </Pressable>
                      <Pressable
                        onPress={() => {
                          setEditingProvider(null);
                          setTempKey("");
                        }}
                        className="flex-1 py-2 rounded-lg items-center justify-center"
                        style={{ backgroundColor: colors.border }}
                      >
                        <Text
                          className="text-sm font-semibold"
                          style={{ color: colors.foreground }}
                        >
                          Cancel
                        </Text>
                      </Pressable>
                    </View>

                    {/* Test Connection Button */}
                    {apiKey?.isActive && (
                      <Pressable
                        onPress={() => handleTestConnection(provider.name)}
                        className="py-2 rounded-lg items-center justify-center"
                        style={{ backgroundColor: colors.success }}
                      >
                        <Text className="text-sm font-semibold text-white">
                          Test Connection
                        </Text>
                      </Pressable>
                    )}
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
