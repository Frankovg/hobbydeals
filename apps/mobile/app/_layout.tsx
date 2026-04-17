import "../global.css";
import { useFonts as useInterFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import { useFonts as useSpaceGroteskFonts, SpaceGrotesk_500Medium, SpaceGrotesk_600SemiBold, SpaceGrotesk_700Bold } from "@expo-google-fonts/space-grotesk";
import { PortalHost } from "@rn-primitives/portal";
// import * as NavigationBar from 'expo-navigation-bar';
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
// import { Platform } from "react-native";

// const isAndroid = Platform.OS === 'android';
// if (isAndroid) {
//   NavigationBar.setBackgroundColorAsync('black')
//   NavigationBar.setButtonStyleAsync('light')
// }

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [interLoaded] = useInterFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const [spaceGroteskLoaded] = useSpaceGroteskFonts({
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  });

  useEffect(() => {
    if (interLoaded && spaceGroteskLoaded) {
      SplashScreen.hideAsync();
    }
  }, [interLoaded, spaceGroteskLoaded]);

  if (!interLoaded || !spaceGroteskLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      <PortalHost />
    </>
  );
}
