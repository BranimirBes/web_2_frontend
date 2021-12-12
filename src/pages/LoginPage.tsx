import React from "react";
import {Box, Stack, Alert} from "@mui/material";
import {LoginBox} from "../components/LoginBox";
import {LoginForm, LoginResponse} from "../api/types";
import {Formik} from "formik";
import * as Yup from "yup";
import * as loginApi from "../api/login";
import {LoginCheckboxGroup} from "../components/LoginCheckboxGroup";
import {BruteForceLogin} from "../components/BruteForceLogin";
import {useNavigate} from "react-router-dom";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Required field"),
  password: Yup.string().required("Required field"),
  captcha: Yup.mixed().when("captchaEnabled", {
    is: (value: boolean) => value,
    then: Yup.string().required("")
  })
});

export type LoginPageProps = {
  succesfulLogin: (response: LoginResponse) => void;
};

export const LoginPage = (props: LoginPageProps) => {
  const [loginError, setLoginError] = React.useState<string>("");
  const navigate = useNavigate();

  const onSubmit = (values: LoginForm) => {
    loginApi.login(values).then((loginResponse) => {
      console.log(loginResponse);
      props.succesfulLogin(loginResponse);
      navigate("/");
    }).catch(reason => {
      setLoginError(reason.message);
    });
  };

  return (
      <Formik
          initialValues={{
            username: "",
            password: "",
            captcha: "",
            limitIpEnabled: true,
            captchaEnabled: true,
            correctMessagesEnabled: true
          } as LoginForm}
          onSubmit={onSubmit}
          validationSchema={LoginSchema}
      >
        {props => (
            <form onSubmit={props.handleSubmit}>
              <Stack spacing={3}>
                <Box sx={{justifyContent: "center", width: "100%", display: "flex", marginTop: "3rem"}}>
                  <LoginCheckboxGroup/>
                </Box>
                <Box sx={{justifyContent: "center", width: "100%", display: "flex"}}>
                  <Box sx={{width: "33%"}}>
                    <LoginBox capchaEnabled={props.values.captchaEnabled}/>
                    {loginError && (<Alert severity="error">{loginError}</Alert>)}
                  </Box>
                </Box>
                <Box>
                  <BruteForceLogin/>
                </Box>
              </Stack>
            </form>
        )}
      </Formik>
  )
}
