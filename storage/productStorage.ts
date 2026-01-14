import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product } from "../types/Product";

const STORAGE_KEY = "PRODUCTS";

export const saveProducts = async (products: Product[]) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (error) {
    console.error("Failed to save products", error);
  }
};

export const loadProducts = async (): Promise<Product[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to load products", error);
    return [];
  }
};
