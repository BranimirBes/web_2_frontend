export type LoginForm = {
  username: string,
  password: string,
  captcha: string,
  limitIpEnabled: boolean,
  captchaEnabled: boolean,
  correctMessagesEnabled: boolean
};

export type LoginResponse = {
  token: string,
  user: Profile
};

export type Profile = {
  id: number,
  username: string,
  firstName: string,
  lastName: string,
  email: string,
  profilePicture: string,
  role: string
};

export type GetProfileCommand = {
  id: string;
  enableBrokenAccess: boolean;
};
