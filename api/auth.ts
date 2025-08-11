import { instance } from ".";
import { storeToken } from "./storage";

export interface UserInfo {
  username: string;
  password: string;
}

export const login = async (userInfo: UserInfo) => {
  const { data } = await instance.post("auth/login", userInfo);
  console.log("I am here:", data.token);
  await storeToken(data.token);
  return data;
};
