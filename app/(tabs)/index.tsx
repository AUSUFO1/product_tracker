import { useProducts } from "@/context/ProductContext";
import { COLORS } from "@/utils/theme";
import { useRouter } from "expo-router";
import {
  Alert,
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUri: string;
}

export default function ProductListScreen() {
  const { products, maxReached, removeProduct } = useProducts();
  const router = useRouter();

  const handleDelete = (id: string, name: string) => {
    Alert.alert(
      "Delete Product",
      `Remove "${name}" from your inventory?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: () => removeProduct(id) 
        },
      ]
    );
  };

  const renderProduct: ListRenderItem<Product> = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imageUri }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.price}>₦{item.price.toLocaleString()}</Text>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id, item.name)}
        activeOpacity={0.7}
      >
        <Text style={styles.deleteIcon}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyEmoji}>📦</Text>
      <Text style={styles.empty}>No products yet</Text>
      <Text style={styles.emptySubtext}>
        Tap "Add Product" below to get started
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>My Products</Text>
        <Text style={styles.counter}>
          {products.length} / 5
        </Text>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        contentContainerStyle={products.length === 0 && styles.emptyList}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
        style={styles.list}
      />

      <TouchableOpacity
        style={[styles.button, maxReached && styles.disabled]}
        onPress={() => router.push("/add-product")}
        disabled={maxReached}
        activeOpacity={0.85}
      >
        <Text style={styles.buttonText}>
          {maxReached ? "Limit Reached (5/5)" : "+ Add Product"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.gold,
  },
  counter: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.white,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  list: {
    paddingHorizontal: 16,
  },
  card: {
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: COLORS.muted,
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.gold,
    marginBottom: 4,
  },
  price: {
    fontSize: 15,
    color: COLORS.white,
    fontWeight: "500",
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 59, 48, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  deleteIcon: {
    color: "#FF3B30",
    fontSize: 18,
    fontWeight: "bold",
  },
  emptyList: {
    flex: 1,
    justifyContent: "center",
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  empty: {
    textAlign: "center",
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  emptySubtext: {
    textAlign: "center",
    color: COLORS.muted,
    fontSize: 14,
  },
  button: {
    backgroundColor: COLORS.gold,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  disabled: {
    backgroundColor: COLORS.muted,
    opacity: 0.6,
  },
  buttonText: {
    color: COLORS.background,
    fontWeight: "bold",
    fontSize: 16,
  },
});