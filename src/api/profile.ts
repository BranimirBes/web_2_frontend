import {APP_URL} from "../appUrl";
import {GetProfileCommand, Profile} from "./types";

export const getProfile = async (token: string, profileCommand: GetProfileCommand): Promise<Profile> => {
  const response = await fetch(`${APP_URL}/api/user/`, {
    method: "POST",
    headers: [
      ["Content-Type", "application/json"],
      ["Authorization", `Bearer ${token}`]
    ],
    body: JSON.stringify(profileCommand)
  });

  if (response.status === 200) {
    const profile = await response.json();
    return Promise.resolve(profile);
  }

  const errorMessage = await response.json();
  return Promise.reject(errorMessage.message);
}
