import { TextField, TextFieldProps } from "@mui/material";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form"

type IProps<T extends FieldValues> = TextFieldProps & {
  control: Control<T, any>;
  field: FieldPath<T>,
  label: string,
  fullWidth?: boolean,
}

export const FTextEdit = <T extends FieldValues>(props: IProps<T>) => {
    return (
      <Controller
        name={props.field}
        control={props.control}
        render={({field, fieldState}) => (
          <TextField
            {...field} {...props}
            inputRef={field.ref}
            variant="outlined"
            fullWidth={props.fullWidth}
            value={field.value || ""}
            onChange={field.onChange}
            error={fieldState.error != undefined}
            helperText={fieldState.error?.message}
            label={props.label}
            autoComplete={props.autoComplete ?? "off"}
          />
          )}
        />
    )
}