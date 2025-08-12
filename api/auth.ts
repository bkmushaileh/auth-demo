import { instance } from ".";
import { storeToken } from "./storage";

export interface UserInfo {
  username: string;
  password: string;
}

export const login = async (userInfo: UserInfo) => {
  const { data } = await instance.post("auth/login", userInfo);
  await storeToken(data.token);
  return data;
};
export const signup = async (userInfo: FormData) => {
  const { data } = await instance.post("auth/register", userInfo);
  await storeToken(data.token);
  return data;
};
