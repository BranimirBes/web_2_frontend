import React from "react";
import {Button, Stack, Card, CircularProgress, Box} from '@mui/material';
import {TextInput} from "./TextInput";
import * as captchaApi from "../api/captcha";
import {Captcha} from "./Captcha";

export type LoginBoxProps = {
  capchaEnabled: boolean,
};

export const LoginBox = (props: LoginBoxProps) => {
  const [captchaSiteKey, setCaptchaSiteKey] = React.useState<string>("");

  React.useEffect(() => {
    captchaApi.getSiteKey().then((siteKey) => setCaptchaSiteKey(siteKey));
  }, []);

  if (!captchaSiteKey) {
    return <CircularProgress/>;
  }

  return (<Card variant="outlined" sx={{padding: "3rem 3rem 3rem 3rem"}}>
    <Stack spacing={2}>
      <TextInput
          name="username"
          id="standard-basic-username"
          label="Username"
          variant="standard"
          type="text"
      />
      <TextInput
          name="password"
          id="standard-basic-password"
          label="Password"
          variant="standard"
          type="password"
      />
      <Box sx={{visibility: props.capchaEnabled ? "visible" : "hidden"}}>
        <Captcha
            name="captcha"
            siteKey={captchaSiteKey}
        />
      </Box>
      <Button variant="contained" type="submit">Login</Button>
    </Stack>
  </Card>);
}
