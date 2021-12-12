import {LoginForm, LoginResponse} from "./types";
import {APP_URL} from "../appUrl";

export const login = async (login: LoginForm): Promise<LoginResponse> => {
  const response = await fetch(`${APP_URL}/api/login`, {
    method: "POST",
    headers: [["Content-Type", "application/json"]],
    body: JSON.stringify(login)
  });

  if (response.status === 400 || response.status === 401) {
    const responseText = await response.json();
    throw Error(responseText.message);
  }

  return await response.json();
}
