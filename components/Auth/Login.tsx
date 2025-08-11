import { login } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
const Login = () => {
  const [userInfo, setUserInfo] = useState({
    username: " ",
    password: " ",
  });
  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,

    onError: (error) => {
      console.log("Error:", error);
    },
    onSuccess: (data) => {
      console.log("Logged in successfully:", data);
    },
  });
  return (
    <View style={styles.container}>
      <Image
        contentFit="contain"
        source={require("@/assets/images/login.png")}
        style={styles.imgStyle}
      />
      <Text style={styles.title}>Login to Your Account</Text>
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
          secureTextEntry={true}
          onChangeText={(text) =>
            setUserInfo({
              ...userInfo,
              password: text,
            })
          }
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            mutate(userInfo);
          }}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.createAccountContainer}
        onPress={() => router.push("/signup")}
      >
        <Text style={styles.createAccountPrompt}>
          Don&apos;t have an account?
        </Text>
        <Text style={styles.createAccountText}> Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D2E2F",
    alignItems: "center",
    justifyContent: "center",
    rowGap: 10,
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
    marginTop: 20,
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
