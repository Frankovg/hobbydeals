import { Button } from "@hobbydeals/ui-native/button";
import { Text } from "@hobbydeals/ui-native/text";
import { View } from "react-native";

export default function FeedScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-4 bg-background p-6">
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
    </View>
  );
}
