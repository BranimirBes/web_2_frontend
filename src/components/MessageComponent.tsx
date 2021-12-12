import React from "react";
import {Message} from "./BruteForceLogin";
import {Typography} from "@mui/material";

type MessageComponentProps = {
  message: Message
}

export const MessageComponent = (props: MessageComponentProps) => {
  const getColor = (): string => {
    if (props.message.type === "error") {
      return "red";
    }
    if (props.message.type === "success") {
      return "green";
    }
    return "black";
  }
  return (
      <Typography variant="caption" display="block" sx={{color: getColor(), overflowWrap: "break-word"}}>
        {props.message.message}
      </Typography>
  )
}
