import Button from "@/components/Button";
import { defaultProductImage } from "@/components/ProductListItem";
import { useCart } from "@/providers/CartProvider";
import { PizzaSize } from "@/types";
import products from "@assets/data/products";
import { useRouter } from "expo-router";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  const router = useRouter();

  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

  const product = products.find((p) => p.id.toString() === id);

  const addToCart = () => {
    console.warn("Add to cart clicked", selectedSize);
    if (!product) return;
    addItem(product, selectedSize);
    router.push("/cart");
  };

  if (!product) return <Text>Product Not Found</Text>;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image
        source={{ uri: product.image || defaultProductImage }}
        style={styles.image}
      />

      <Text style={styles.title}>$ {product.name}</Text>
      <Text style={styles.price}>$ {product.price}</Text>
      {/* <Button onPress={addToCart} text="Add To Cart" /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    // marginTop: "auto",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ProductDetailsScreen;
