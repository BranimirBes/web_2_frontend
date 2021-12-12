import React from "react";
import {TextFieldProps} from "@mui/material/TextField/TextField";
import {useField, useFormikContext} from "formik";
import {TextField} from "@mui/material";

export type TextInputProps = {
  name: string
} & Pick<TextFieldProps, "id" | "label" | "variant" | "type">;

export const TextInput = ({name, ...props}: TextInputProps) => {
  const [field, meta, ] = useField(name);
  const formikContext = useFormikContext();
  return (
      <TextField
          {...field}
          {...props}
          error={Boolean(meta.error && formikContext.submitCount > 0)}
          helperText={meta.error ?? ""}
      />
  )
};
