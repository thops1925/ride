import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View>
        <Link href="/">
          <Text>Goto home Screen</Text>
        </Link>
      </View>
    </>
  );
}
