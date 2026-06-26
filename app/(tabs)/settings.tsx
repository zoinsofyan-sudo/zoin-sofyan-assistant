import { ScrollView, Text, View, Pressable, Switch } from "react-native";
import { useColors } from "@/hooks/use-colors";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useState } from "react";
import { useRouter } from "expo-router";

const AI_PROVIDERS = ["Claude", "Deepseek", "Qwen", "Gemini", "Hugging Face", "Groq"];
const THEMES = ["Gradient", "Dark", "Light"];

interface SettingsSection {
  title: string;
  icon: string;
  items: SettingsItem[];
}

interface SettingsItem {
  label: string;
  type: "toggle" | "select" | "button" | "navigate";
  value?: boolean | string;
}

export default function SettingsScreen() {
  const colors = useColors();
  const router = useRouter();
  const [expandedSection, setExpandedSection] = useState<string | null>("provider");
  const [provider, setProvider] = useState("Gemini");
  const [theme, setTheme] = useState("Gradient");
  const [notifications, setNotifications] = useState(true);
  const [caching, setCaching] = useState(true);
  const [batchSize, setBatchSize] = useState("10");

  const sections: SettingsSection[] = [
    {
      title: "AI Provider",
      icon: "sparkles",
      items: [
        { label: "Default Provider", type: "select" },
        { label: "Manage API Keys", type: "navigate" },
        { label: "Cache Responses", type: "toggle", value: caching },
        { label: "Test Connection", type: "button" },
      ],
    },
    {
      title: "Microstock",
      icon: "doc.text.fill",
      items: [
        { label: "Auto-detect Platform", type: "toggle" },
        { label: "Auto-fill Metadata", type: "toggle" },
        { label: "Batch Size", type: "select" },
      ],
    },
    {
      title: "UI Settings",
      icon: "paintbrush.fill",
      items: [
        { label: "Theme", type: "select" },
        { label: "Floating Widget", type: "toggle" },
        { label: "Splash Screen", type: "toggle" },
      ],
    },
    {
      title: "Notifications",
      icon: "bell.fill",
      items: [
        { label: "Enable Notifications", type: "toggle", value: notifications },
        { label: "Sound Alerts", type: "toggle" },
        { label: "Completion Alerts", type: "toggle" },
      ],
    },
    {
      title: "Storage & Data",
      icon: "folder.fill",
      items: [
        { label: "Clear Cache", type: "button" },
        { label: "Export Settings", type: "button" },
        { label: "Import Settings", type: "button" },
        { label: "Reset to Defaults", type: "button" },
      ],
    },
  ];

  const toggleSection = (sectionTitle: string) => {
    setExpandedSection(
      expandedSection === sectionTitle ? null : sectionTitle
    );
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
            Settings
          </Text>
          <Text
            className="text-sm mt-1"
            style={{ color: colors.muted }}
          >
            Configure your preferences
          </Text>
        </View>

        {/* Settings Sections */}
        <View className="px-6 pb-8">
          {sections.map((section, index) => (
            <View key={index} className="mb-4">
              {/* Section Header */}
              <Pressable
                onPress={() => toggleSection(section.title)}
                className="flex-row items-center justify-between p-4 rounded-lg"
                style={{
                  backgroundColor:
                    expandedSection === section.title
                      ? colors.primary
                      : colors.surface,
                }}
              >
                <View className="flex-row items-center gap-3 flex-1">
                  <IconSymbol
                    name={section.icon as any}
                    size={20}
                    color={
                      expandedSection === section.title
                        ? "#fff"
                        : colors.foreground
                    }
                  />
                  <Text
                    className="text-base font-semibold"
                    style={{
                      color:
                        expandedSection === section.title
                          ? "#fff"
                          : colors.foreground,
                    }}
                  >
                    {section.title}
                  </Text>
                </View>
                <IconSymbol
                  name={
                    expandedSection === section.title
                      ? "chevron.right"
                      : "chevron.right"
                  }
                  size={20}
                  color={
                    expandedSection === section.title
                      ? "#fff"
                      : colors.muted
                  }
                />
              </Pressable>

              {/* Section Items */}
              {expandedSection === section.title && (
                <View
                  className="mt-2 rounded-lg overflow-hidden"
                  style={{ backgroundColor: colors.surface }}
                >
                  {section.items.map((item, itemIndex) => (
                    <View
                      key={itemIndex}
                      className={`flex-row items-center justify-between p-4 ${
                        itemIndex < section.items.length - 1
                          ? "border-b"
                          : ""
                      }`}
                      style={{
                        borderColor: colors.border,
                      }}
                    >
                      <Text
                        className="text-sm font-medium"
                        style={{ color: colors.foreground }}
                      >
                        {item.label}
                      </Text>

                      {item.type === "toggle" && (
                        <Switch
                          value={item.value as boolean}
                          onValueChange={(val) => {
                            if (item.label === "Cache Responses")
                              setCaching(val);
                            if (item.label === "Enable Notifications")
                              setNotifications(val);
                          }}
                          trackColor={{ false: colors.border, true: colors.primary }}
                        />
                      )}

                      {item.type === "select" && (
                        <View className="flex-row gap-2">
                          {(item.label === "Default Provider"
                            ? AI_PROVIDERS.slice(0, 2)
                            : item.label === "Theme"
                              ? THEMES
                              : ["10", "20", "50"]
                          ).map((opt) => (
                            <Pressable
                              key={opt}
                              onPress={() => {
                                if (item.label === "Default Provider")
                                  setProvider(opt);
                                if (item.label === "Theme") setTheme(opt);
                              }}
                              className="px-2 py-1 rounded"
                              style={{
                                backgroundColor:
                                  (item.label === "Default Provider" &&
                                    provider === opt) ||
                                  (item.label === "Theme" && theme === opt)
                                    ? colors.primary
                                    : colors.border,
                              }}
                            >
                              <Text
                                className="text-xs font-semibold"
                                style={{
                                  color:
                                    (item.label === "Default Provider" &&
                                      provider === opt) ||
                                    (item.label === "Theme" && theme === opt)
                                      ? "#fff"
                                      : colors.foreground,
                                }}
                              >
                                {opt}
                              </Text>
                            </Pressable>
                          ))}
                        </View>
                      )}

                      {item.type === "button" && (
                        <Pressable
                          className="px-3 py-1 rounded"
                          style={{ backgroundColor: colors.primary }}
                        >
                          <Text className="text-xs font-semibold text-white">
                            {item.label === "Clear Cache"
                              ? "Clear"
                              : item.label === "Export Settings"
                                ? "Export"
                                : item.label === "Import Settings"
                                  ? "Import"
                                  : "Reset"}
                          </Text>
                        </Pressable>
                      )}

                      {item.type === "navigate" && (
                        <Pressable
                          onPress={() => router.push("/api-keys")}
                          className="px-3 py-1 rounded flex-row items-center gap-1"
                          style={{ backgroundColor: colors.primary }}
                        >
                          <Text className="text-xs font-semibold text-white">
                            Manage
                          </Text>
                          <IconSymbol
                            name="chevron.right"
                            size={12}
                            color="#fff"
                          />
                        </Pressable>
                      )}
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>

        {/* App Version */}
        <View className="px-6 pb-8 items-center">
          <Text
            className="text-xs"
            style={{ color: colors.muted }}
          >
            ZoinSofyan Assistant v1.0.0
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
