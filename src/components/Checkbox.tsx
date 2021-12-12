import React from "react";
import {Checkbox as MaterialCheckbox, FormControlLabel} from "@mui/material";
import {useField} from "formik";

export type CheckboxProps = {
  name: string
  label: string
};

export const Checkbox = (props: CheckboxProps) => {
  const [field, , helpers] = useField<boolean>(props.name);
  return (
      <FormControlLabel
          control={
            <MaterialCheckbox
                checked={field.value}
                onChange={(event) => helpers.setValue(Boolean(event.target.checked), false)}
            />
          }
          label={props.label}
      />
  )
};
