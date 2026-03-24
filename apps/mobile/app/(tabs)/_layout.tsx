import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#D85A30",
        headerShown: true,
        headerTitle: "HobbyDeals",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Feed",
          tabBarLabel: "Feed",
        }}
      />
      <Tabs.Screen
        name="categorias"
        options={{
          title: "Categorías",
          tabBarLabel: "Categorías",
        }}
      />
      <Tabs.Screen
        name="buscar"
        options={{
          title: "Buscar",
          tabBarLabel: "Buscar",
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarLabel: "Perfil",
        }}
      />
    </Tabs>
  );
}
