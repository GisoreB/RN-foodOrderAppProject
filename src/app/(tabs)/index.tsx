import { Image, StyleSheet } from "react-native";

import { Text, View } from "@/src/components/Themed";
import Colors from "@/src/constants/Colors";
import products from "@/assets/data/products";

export default function TabOneScreen() {
  const product = products[0];
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>$ {product.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 30,
    margin: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});
