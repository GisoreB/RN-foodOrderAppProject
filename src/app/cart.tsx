import Button from "@/components/Button";
import CartListItem from "@/components/CartListItem";
import { CartContext, useCart } from "@/providers/CartProvider";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { FlatList, Platform, Text, View } from "react-native";

export default function CartScreen() {
  const { items, total } = useCart();

  return (
    <View style={{ padding: 10 }}>
      {/* <Text>Cart</Text> */}
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10 }}
      />

      <Text
        style={{ margin: 10, fontWeight: "500", fontSize: 20, padding: 10 }}
      >
        Total : ${total}
      </Text>

      <Button text="Checkout" />

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
