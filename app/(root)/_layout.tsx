import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="movie" options={{ headerShown: false }} />
      <Stack.Screen name="person" options={{ headerShown: false }} />
    </Stack>
  );
};
export default Layout;
