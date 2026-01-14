import React, { createContext, useContext, useEffect, useState } from "react";
import { loadProducts, saveProducts } from "../storage/productStorage";
import { Product } from "../types/Product";
import { showProductLimitNotification, showSuccessNotification } from "../utils/notifications";

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => boolean;
  removeProduct: (id: string) => void;
  maxReached: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const MAX_PRODUCTS = 5;

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  // derived state
  const maxReached = products.length >= MAX_PRODUCTS;

  useEffect(() => {
    loadProducts()
      .then(setProducts)
      .catch(() => setProducts([]));
  }, []);

  useEffect(() => {
    saveProducts(products);
  }, [products]);

  const addProduct = (product: Product): boolean => {
    if (products.length >= MAX_PRODUCTS) {
      // Use Toast instead of Alert
      showProductLimitNotification(product.name);
      return false;
    }

    setProducts((prev) => {
      const newProducts = [...prev, product];
      const newCount = newProducts.length;

      // Show toast notification
      if (newCount === MAX_PRODUCTS) {
        showProductLimitNotification(product.name); // 5th product
      } else {
        showSuccessNotification(product.name, newCount); // 1-4 products
      }

      return newProducts;
    });

    return true;
  };

  const removeProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    saveProducts(updated);
  };

  return (
    <ProductContext.Provider
      value={{ products, addProduct, removeProduct, maxReached }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within ProductProvider");
  }
  return context;
};
