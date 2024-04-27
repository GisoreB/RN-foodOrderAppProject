import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import React, { useState } from "react";
import Button from "@/components/Button";
import Colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const [errors, setErrors] = useState("");

  const validateInput = () => {
    setErrors("");
    if (!name) {
      setErrors("Name is required");
      return false;
    }
    if (!price) {
      setErrors("Price is required");
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setErrors("Price should be a number");
      return false;
    }
    return true;
  };

  const onCreate = () => {
    if (!validateInput()) {
      return;
    }

    alert("creating product " + name + " " + price);

    // save in db

    setName("");
    setPrice("");
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            image ??
            "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png",
        }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text onPress={pickImage} style={styles.textButton}>
        Select Image
      </Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <Text style={styles.label}>Price ${}</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="99.99"
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.error}>{errors}</Text>

      <Button text="create" onPress={onCreate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "white",
    justifyContent: "center",
    padding: 10,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
  label: {
    color: "gray",
    fontWeight: "700",
    fontSize: 18,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 20,
  },
  error: {
    color: "red",
    textAlign: "center",
  },
});

export default CreateProduct;
