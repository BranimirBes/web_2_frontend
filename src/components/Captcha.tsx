import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import {Box} from '@mui/material';
import {useField} from "formik";

export type CaptchaProps = {
  name: string
  siteKey: string,
};

export const Captcha = (props: CaptchaProps) => {
  const [, , helpers] = useField(props.name);

  return (
      <Box sx={{display: "flex", justifyContent: "center"}}>
        <ReCAPTCHA
            sitekey={props.siteKey}
            onChange={(value) => helpers.setValue(value ?? "")}
        />
      </Box>
  );
};
