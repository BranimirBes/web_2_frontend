import React from "react";
import {Checkbox} from "./Checkbox";

export const LoginCheckboxGroup = () => {
  return (<>
        <Checkbox name="limitIpEnabled" label="Ograničavanje pokušaja"/>
        <Checkbox name="captchaEnabled" label="Uključena CAPTCHA"/>
        <Checkbox name="correctMessagesEnabled" label="Ispravne poruke o grešci"/>
      </>
  );
}
