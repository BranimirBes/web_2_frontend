import React from "react";
import {useFormikContext} from "formik";
import {Button, MenuItem, Stack, Select, Box, FormControl, Typography} from "@mui/material";
import PASSWORD_DICTIONARY from "../util/passwordDictionary";
import * as loginApi from "../api/login";
import {LoginForm} from "../api/types";
import {AttackMessages} from "./AttackMessages";
import {timeout} from "../util/timeout";

export type MessageType = "info" | "error" | "success";
export type Message = {
  message: string,
  type: MessageType
};

export const BruteForceLogin = () => {
  const [username, setUsername] = React.useState<string>("ivo");
  const [messages, setMessages] = React.useState<Message[]>([]);

  const [dictionaryIndex, setDictionaryIndex] = React.useState<number>(-1);
  const [lastExecutedIndex, setLastExecutedIndex] = React.useState<number>(-1);

  const [lockExecution, setLockExecution] = React.useState<boolean>(false);
  const [runExecution, setRunExecution] = React.useState<boolean>(false);

  const formikContext = useFormikContext();

  const getLoginForm = (password: string): LoginForm => {
    // @ts-ignore
    const loginFormFormik = {...formikContext.values};
    return {
      ...loginFormFormik,
      username: username,
      password: password
    } as LoginForm
  };

  React.useEffect(() => {
    if (!lockExecution && dictionaryIndex !== -1 && dictionaryIndex !== lastExecutedIndex) {
      if (runExecution) {
        setLockExecution(true);
        const password = PASSWORD_DICTIONARY[dictionaryIndex];
        appendMessage(`Trying password ${password}`, "info");
        timeout(10).then(() => {
          loginApi.login(getLoginForm(password))
              .then((response) => {
                appendMessage(`Success. Token is ${response.token}`, "success");
                setRunExecution(false);
                setDictionaryIndex(-1);
                setLastExecutedIndex(-1);
                setLockExecution(false);
              })
              .catch((reason) => {
                appendMessage(`${reason}`, "error");
                return Promise.resolve();
              }).then(() => {
            setDictionaryIndex((value) => value + 1);
            setLastExecutedIndex((value) => value + 1);
            setLockExecution(false);
          })
        });
      } else {
        setDictionaryIndex(-1);
        setLastExecutedIndex(-1);
        setLockExecution(false);
      }
    }
  }, [dictionaryIndex, getLoginForm, lastExecutedIndex, lockExecution, runExecution]);

  const startAttack = () => {
    setMessages([]);
    appendMessage(`Started attack on user ${username}`, "success");
    setDictionaryIndex(0);
    setRunExecution(true);
  }

  const stopAttack = () => {
    setRunExecution(false);
    appendMessage(`Stop`, "error");
  }

  const isAttackRunning = (): boolean => {
    return runExecution;
  }

  const appendMessage = (msg: string, type: MessageType) => {
    setMessages((prevState => {
      return [...prevState, {message: msg, type: type}] as Message[];
    }));
  }

  return (
      <Box sx={{width: "100%"}}>
        <Box sx={{width: "100%", display: "flex", justifyContent: "center"}}>
          <Box sx={{width: "20rem"}}>
            <Typography variant="h5" gutterBottom component="div">
              Brute force vertical attack
            </Typography>
            <Stack direction="row" spacing={2}>
              <Box sx={{width: "10rem"}}>
                <FormControl fullWidth>
                  <Select
                      labelId="username-brute-force-select-label"
                      id="username-brute-force"
                      value={username}
                      label="Username"
                      onChange={(event) => setUsername(event.target.value)}
                      disabled={isAttackRunning()}
                  >
                    <MenuItem value={"pero"}>pero</MenuItem>
                    <MenuItem value={"ivo"}>ivo</MenuItem>
                    <MenuItem value={"marko"}>marko</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              {!isAttackRunning() ? (
                  <Button
                      type="button"
                      onClick={() => startAttack()}
                      variant="contained"
                      color="primary"
                  >
                    Start
                  </Button>
              ) : (
                  <Button
                      type="button"
                      onClick={() => stopAttack()}
                      variant="contained"
                      color="error"
                  >
                    Stop
                  </Button>
              )}
            </Stack>
          </Box>
        </Box>
        <Box sx={{width: "100%", display: "flex", justifyContent: "center", marginTop: "2rem"}}>
          <Box sx={{width: "90%", height: "30rem", overflowY: "scroll", backgroundColor: "rgb(206, 200, 200)"}}>
            <AttackMessages messages={messages}/>
          </Box>
        </Box>
      </Box>
  )
};
