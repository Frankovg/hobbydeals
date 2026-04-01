import { Button } from "@hobbydeals/ui/button";
import { Text } from "@hobbydeals/ui/text";
import { ScrollView, View } from "react-native";

const variants = ["default", "secondary", "destructive", "outline", "ghost"] as const;

export default function FeedScreen() {
  return (
    <ScrollView className="flex-1 bg-bg-base" contentContainerClassName="p-6 gap-6">
      <Text variant="h3">Button Variants</Text>

      {variants.map((variant) => (
        <View key={variant} className="gap-3">
          <Text variant="muted" className="capitalize">
            {variant}
          </Text>
          <View className="flex-row flex-wrap gap-3">
            <Button variant={variant} size="default">
              <Text>Default</Text>
            </Button>
            <Button variant={variant} size="sm">
              <Text>Small</Text>
            </Button>
            <Button variant={variant} size="default" disabled>
              <Text>Disabled</Text>
            </Button>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
