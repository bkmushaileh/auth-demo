import { signup } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type userInformation = {
  username: string;
  password: string;
  image: string;
};
const Signup = () => {
  const [userInfo, setUserInfo] = useState<userInformation>({
    username: " ",
    password: " ",
    image: " ",
  });
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setUserInfo({ ...userInfo, image: result.assets[0].uri });
    }
  };

  const { mutate, data } = useMutation({
    mutationKey: ["signup"],
    mutationFn: signup,
    onSuccess: () => {
      console.log("SignedUp successfully", data);
    },
    onError: (err) => {
      console.log("My error:", err);
    },
  });

  const handleSignup = () => {
    const formData = new FormData();
    formData.append("username", userInfo.username);
    formData.append("password", userInfo.password);
    formData.append("image", userInfo.image);

    mutate(formData);
  };

  return (
    <View style={styles.container}>
      {/* <Image
        contentFit="contain"
        source={require("@/assets/images/login.png")}
        style={styles.imgStyle}
      /> */}
      <Image
        style={{ borderRadius: "100%", height: 230, width: 230 }}
        source={{ uri: userInfo.image }}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={pickImage}>
          <Text style={{ color: "white" }}>Pick your profile image</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Create a New Account</Text>
      <View style={styles.fieldsContainer}>
        <Text style={styles.fieldLabel}>Username</Text>
        <TextInput
          placeholder=""
          style={styles.textInput}
          onChangeText={(text) =>
            setUserInfo({
              ...userInfo,
              username: text,
            })
          }
        />
        <Text style={styles.fieldLabel}>Password</Text>
        <TextInput
          placeholder=""
          style={styles.textInput}
          onChangeText={(text) =>
            setUserInfo({
              ...userInfo,
              password: text,
            })
          }
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.createAccountContainer}
        onPress={() => router.dismissTo("/")}
      >
        <Text style={styles.createAccountPrompt}>Already have an account?</Text>
        <Text style={styles.createAccountText}> Login.</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D2E2F",
    alignItems: "center",
    justifyContent: "center",
    rowGap: 5,
  },
  imgStyle: {
    width: 300,
    height: 300,
  },
  title: {
    color: "#deddd1ff",
    fontWeight: "bold",
    fontSize: 20,
    paddingVertical: 10,
  },
  fieldsContainer: {
    width: 300,
    alignItems: "center",
    rowGap: 2,
  },
  fieldLabel: {
    color: "#deddd1ff",
    alignSelf: "flex-start",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#deddd1ff",
    width: "100%",
    borderRadius: 10,
    paddingVertical: 10,
    marginVertical: 5,
  },
  loginButton: {
    borderRadius: 10,
    paddingVertical: 15,
    backgroundColor: "#FE8723",
    width: "100%",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    color: "#ffffffff",
    fontSize: 20,
  },
  createAccountContainer: {
    flexDirection: "row",
  },
  createAccountPrompt: {
    color: "#deddd1ff",
  },
  createAccountText: {
    color: "#FE8723",
  },
});
