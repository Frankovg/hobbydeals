// Bridge module used by Storybook in place of `react-native`.
//
// Why this file exists
// --------------------
// Storybook runs Vite + react-native-web. Plain `react-native-web` accepts
// `className` on its primitives only via the `{ $$css: true, ... }` style
// shape — it ignores string `className` props. NativeWind v5 is the piece
// that normally bridges that gap on native (via Metro + Babel), but in Vite
// we don't have that transform.
//
// `react-native-css/components/X` exports runtime wrappers that take
// `className="..."` and forward it as `style={{ $$css: true, className }}`
// to the underlying RN-Web primitive. So we re-export the wrapped versions
// for the primitives we actually use, and pass everything else through to
// `react-native-web` directly.
//
// The barrel `react-native-css/components` itself can't be used because it
// exposes CJS getters that Vite can't statically analyze as named ESM
// exports (e.g. `import { Platform } from "react-native-css/components"`
// fails). Importing the individual component files avoids that.

export { Pressable } from "react-native-css/components/Pressable";
export { Text } from "react-native-css/components/Text";
export { View } from "react-native-css/components/View";
export { ScrollView } from "react-native-css/components/ScrollView";
export { FlatList } from "react-native-css/components/FlatList";
export { Image } from "react-native-css/components/Image";
export { ImageBackground } from "react-native-css/components/ImageBackground";
export { TextInput } from "react-native-css/components/TextInput";
export { Switch } from "react-native-css/components/Switch";
export { ActivityIndicator } from "react-native-css/components/ActivityIndicator";
export { TouchableOpacity } from "react-native-css/components/TouchableOpacity";
export { TouchableHighlight } from "react-native-css/components/TouchableHighlight";
export { KeyboardAvoidingView } from "react-native-css/components/KeyboardAvoidingView";

// Non-visual APIs: no className handling needed, pass through verbatim.
export {
  Platform,
  StyleSheet,
  Dimensions,
  Appearance,
  PixelRatio,
  Animated,
  Easing,
  I18nManager,
  Linking,
  AppState,
  NativeModules,
  useWindowDimensions,
  useColorScheme,
  UIManager,
  findNodeHandle,
} from "react-native-web";

// Types: re-exported from `react-native` directly. The type resolution
// bypasses the runtime alias (Vite only aliases runtime imports), so this
// stays pointed at `@types/react-native` as intended.
export type {
  ColorValue,
  FlexStyle,
  GestureResponderEvent,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  PressableProps,
  Role,
  StyleProp,
  TextInputProps,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from "react-native";
