import { Tabs } from "expo-router";

import {
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "#121212",
        },

        headerTintColor: "#fff",

        tabBarStyle: {
          backgroundColor: "#1E1E1E",
          borderTopWidth: 0,
        },

        tabBarActiveTintColor:
          "#00A86B",

        tabBarInactiveTintColor:
          "#999",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Vacinas",

          tabBarIcon: ({
            color,
            size,
          }) => (
            <FontAwesome5
              name="syringe"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",

          tabBarIcon: ({
            color,
            size,
          }) => (
            <MaterialIcons
              name="person"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="nova-vacina"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="editar-vacina"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}