import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="movieScreen" options={{ headerShown: false }} />
      <Stack.Screen name="person" options={{ headerShown: false }} />
      <Stack.Screen name="searchScreen" options={{ headerShown: false }} />
      <Stack.Screen name="seeAll" options={{ headerShown: false }} />
    </Stack>
  );
};
export default Layout;
