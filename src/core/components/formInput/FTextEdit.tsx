import { TextField, TextFieldProps } from "@mui/material";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form"

interface IProps<T extends FieldValues> {
  control: Control<T, any>;
  field: FieldPath<T>,
  label: string,
  fullWidth?: boolean,
  textFieldProps?: TextFieldProps
}

export const FTextEdit = <T extends FieldValues>(props: IProps<T>) => {
    return (
      <Controller
        name={props.field}
        control={props.control}
        render={({field, fieldState}) => (
          <TextField
            {...field}
            inputRef={field.ref}
            variant="outlined"
            fullWidth={props.fullWidth}
            value={field.value || ""}
            onChange={field.onChange}
            error={fieldState.error != undefined}
            helperText={fieldState.error?.message}
            label={props.label}
          />
          )}
        />
    )
}