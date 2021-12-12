import {APP_URL} from "../appUrl";

export const getSiteKey = async (): Promise<string> => {
  const response = await fetch(`${APP_URL}/captchaSiteKey`);
  const keyObject = await response.json();
  return keyObject.siteKey;
}
