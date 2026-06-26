// Fallback for using MaterialIcons on Android and web.
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight, SymbolViewProps } from "expo-symbols";
import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

type IconMapping = Record<string, string>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  "house.fill": "home",
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
  "hammer.fill": "build",
  "photo.fill": "image",
  "gear.fill": "settings",
  "sparkles": "auto-awesome",
  "doc.text.fill": "description",
  "square.and.pencil": "edit",
  "checkmark.circle.fill": "check-circle",
  "xmark.circle.fill": "cancel",
  "plus.circle.fill": "add-circle",
  "arrow.up.circle.fill": "publish",
  "arrow.down.circle.fill": "download",
  "trash.fill": "delete",
  "square.and.arrow.up": "share",
  "doc.on.clipboard": "content-paste",
  "clock.fill": "history",
  "magnifyingglass": "search",
  "slider.horizontal.3": "tune",
  "bell.fill": "notifications-active",
  "moon.fill": "dark-mode",
  "sun.max.fill": "light-mode",
  "paintbrush.fill": "palette",
  "bolt.fill": "flash-on",
  "info.circle.fill": "info",
  "exclamationmark.circle.fill": "warning",
  "checkmark.seal.fill": "verified",
  "star.fill": "star",
  "heart.fill": "favorite",
  "bookmark.fill": "bookmark",
  "folder.fill": "folder",
  "square.grid.2x2": "dashboard",
  "list.bullet": "list",
  "arrow.left": "arrow-back",
  "arrow.right": "arrow-forward",
  "xmark": "close",
  "plus": "add",
  "minus": "remove",
  "ellipsis": "more-vert",
  "eye.fill": "visibility",
  "eye.slash.fill": "visibility-off",
  "lock.fill": "lock",
  "unlock.fill": "lock-open",
} as const;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name] as any} style={style} />;
}
