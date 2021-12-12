import React from "react";
import {Message} from "./BruteForceLogin";
import {Box} from "@mui/material";
import {MessageComponent} from "./MessageComponent";

export type AttackMessagesProps = {
  messages: Message[]
}

export const AttackMessages = (props: AttackMessagesProps) => {
  return (
      <Box sx={{width: "100%"}}>
        {props.messages.map(function (message, idx) {
          return (<MessageComponent key={idx} message={message}/>)
        })}
      </Box>
  )
}
