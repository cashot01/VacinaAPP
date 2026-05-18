import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#121212",
        },
        headerTintColor: "#fff",
        contentStyle: {
          backgroundColor: "#121212",
        },
      }}
    />
  );
}