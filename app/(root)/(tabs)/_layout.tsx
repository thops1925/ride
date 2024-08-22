import { Stack } from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.

const layout = () => {
  return (
    <Stack>
      <Stack.Screen name="chat" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="rides" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
    </Stack>
  );
};
export default layout;
