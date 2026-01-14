import { Stack } from "expo-router";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { ProductProvider } from "../context/ProductContext";

export default function RootLayout() {
  return (
    <ProductProvider>
      <View style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
        <Toast />
      </View>
    </ProductProvider>
  );
}
