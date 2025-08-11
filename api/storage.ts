import * as SecureStore from "expo-secure-store";

export const storeToken = async (token: string) => {
  try {
    await SecureStore.setItemAsync("token", token);
  } catch (error) {
    console.error("Error storing token:", error);
  }
};

export const getToken = async () => {
  try {
    return await SecureStore.getItemAsync("token");
  } catch (error) {
    console.error("Error getting token:", error);
  }
};

export const deleteToken = async () => {
  try {
    await SecureStore.deleteItemAsync("token");
  } catch (error) {
    console.error("Error deleting token:", error);
  }
};
