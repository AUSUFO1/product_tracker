import { useProducts } from "@/context/ProductContext";
import { showProductLimitNotification } from "@/utils/notifications";
import { COLORS } from "@/utils/theme";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddProductScreen() {
  const { addProduct, maxReached } = useProducts();
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = async () => {
    if (maxReached) {
      showProductLimitNotification("Product");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (maxReached) {
      showProductLimitNotification("Product");
      return;
    }

    if (!name.trim() || !price || !imageUri) {
      showProductLimitNotification("Please fill all fields");
      return;
    }

    const numericPrice = Number(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      showProductLimitNotification("Please enter a valid price greater than 0");
      return;
    }

    const success = await addProduct({
      id: Date.now().toString(),
      name: name.trim(),
      price: numericPrice,
      imageUri,
    });

    if (success) {
      setTimeout(() => {
        router.back();
      }, 500);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.gold} />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.title}>Add New Product</Text>
          <Text style={styles.subtitle}>Fill in the details below</Text>
        </View>
      </View>

      {/* Limit Warning Banner */}
      {maxReached && (
        <View style={styles.warningBanner}>
          <Ionicons name="warning" size={20} color="#FF3B30" />
          <Text style={styles.warningText}>
            Product limit reached (5/5)
          </Text>
        </View>
      )}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Product Name</Text>
            <TextInput
              placeholder="e.g., Wireless Headphones"
              placeholderTextColor={COLORS.muted}
              style={[styles.input, maxReached && styles.inputDisabled]}
              value={name}
              onChangeText={setName}
              editable={!maxReached}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Price (₦)</Text>
            <TextInput
              placeholder="e.g., 25000"
              placeholderTextColor={COLORS.muted}
              style={[styles.input, maxReached && styles.inputDisabled]}
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
              editable={!maxReached}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Product Image</Text>
            <TouchableOpacity
              style={[styles.imagePicker, maxReached && styles.imagePickerDisabled]}
              onPress={pickImage}
              activeOpacity={0.7}
              disabled={maxReached}
            >
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.image} />
              ) : (
                <View style={styles.placeholderContainer}>
                  <Ionicons
                    name="camera-outline"
                    size={48}
                    color={maxReached ? "#555" : COLORS.muted}
                  />
                  <Text
                    style={[
                      styles.placeholderText,
                      maxReached && styles.placeholderTextDisabled,
                    ]}
                  >
                    {maxReached ? "Limit reached" : "Tap to select image"}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, maxReached && styles.disabled]}
          onPress={handleSave}
          disabled={maxReached}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>
            {maxReached ? "Product Limit Reached (5/5)" : "Save Product"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  headerContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(212, 175, 55, 0.1)",
  },
  backButton: { padding: 8, marginRight: 8, marginTop: 4 },
  headerTextContainer: { flex: 1 },
  title: { fontSize: 28, fontWeight: "bold", color: COLORS.gold, marginBottom: 4 },
  subtitle: { fontSize: 14, color: COLORS.muted },
  warningBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 59, 48, 0.1)",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#FF3B30",
    gap: 8,
  },
  warningText: { color: "#FF3B30", fontSize: 14, fontWeight: "600", flex: 1 },
  scrollView: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  form: { marginBottom: 24 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "600", color: COLORS.white, marginBottom: 8 },
  input: {
    backgroundColor: COLORS.primary,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)",
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
    color: COLORS.white,
  },
  inputDisabled: { opacity: 0.5, backgroundColor: "#1a1a1a" },
  imagePicker: {
    height: 200,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "rgba(212, 175, 55, 0.3)",
    borderStyle: "dashed",
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  imagePickerDisabled: { opacity: 0.5, borderColor: "#555" },
  image: { width: "100%", height: "100%", borderRadius: 10 },
  placeholderContainer: { alignItems: "center", justifyContent: "center", gap: 12 },
  placeholderText: { color: COLORS.muted, fontSize: 14, fontWeight: "500" },
  placeholderTextDisabled: { color: "#555" },
  button: { backgroundColor: COLORS.gold, padding: 16, borderRadius: 12, alignItems: "center", marginBottom: 12 },
  disabled: { backgroundColor: COLORS.muted, opacity: 0.6 },
  buttonText: { color: COLORS.background, fontWeight: "bold", fontSize: 16 },
  cancelButton: {
    backgroundColor: "transparent",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.muted,
  },
  cancelButtonText: { color: COLORS.white, fontWeight: "600", fontSize: 16 },
});
