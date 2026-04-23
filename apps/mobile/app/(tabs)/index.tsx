import { Badge } from "@hobbydeals/ui-native/badge";
import { Button } from "@hobbydeals/ui-native/button";
import { Text } from "@hobbydeals/ui-native/text";
import { ScrollView, View } from "react-native";

export default function FeedScreen() {
  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="items-center gap-4 p-6"
    >
      <Text variant="h3">HobbyDeals</Text>
      <Text variant="muted">Probando componentes de ui-native</Text>

      <View className="w-full gap-3 mt-6">
        <Button>
          <Text>Default</Text>
        </Button>
        <Button variant="secondary">
          <Text>Secondary</Text>
        </Button>
        <Button variant="destructive">
          <Text>Destructive</Text>
        </Button>
        <Button variant="outline">
          <Text>Outline</Text>
        </Button>
        <Button variant="ghost">
          <Text>Ghost</Text>
        </Button>
        <Button variant="link">
          <Text>Link</Text>
        </Button>
      </View>

      <View className="w-full gap-3 mt-6">
        <Text variant="muted">Badges — semánticos</Text>
        <View className="flex-row flex-wrap gap-2">
          <Badge>
            <Text>Activo</Text>
          </Badge>
          <Badge variant="secondary">
            <Text>Pendiente</Text>
          </Badge>
          <Badge variant="destructive">
            <Text>Expirado</Text>
          </Badge>
          <Badge variant="outline">
            <Text>Etiqueta</Text>
          </Badge>
          <Badge variant="discount">
            <Text>-45%</Text>
          </Badge>
        </View>

        <Text variant="muted" className="mt-3">
          Badges — temperatura
        </Text>
        <View className="flex-row flex-wrap gap-2">
          <Badge variant="burning">
            <Text>342°</Text>
          </Badge>
          <Badge variant="hot">
            <Text>180°</Text>
          </Badge>
          <Badge variant="warm">
            <Text>75°</Text>
          </Badge>
          <Badge variant="cold">
            <Text>-12°</Text>
          </Badge>
        </View>

        <Text variant="muted" className="mt-3">
          Badges — categorías
        </Text>
        <View className="flex-row flex-wrap gap-2">
          <Badge variant="board-games">
            <Text>Juegos de Mesa</Text>
          </Badge>
          <Badge variant="gaming">
            <Text>Gaming</Text>
          </Badge>
          <Badge variant="collectibles">
            <Text>Coleccionismo</Text>
          </Badge>
          <Badge variant="airsoft">
            <Text>Airsoft</Text>
          </Badge>
          <Badge variant="music">
            <Text>Música</Text>
          </Badge>
          <Badge variant="modeling">
            <Text>Modelismo</Text>
          </Badge>
        </View>
      </View>
    </ScrollView>
  );
}
