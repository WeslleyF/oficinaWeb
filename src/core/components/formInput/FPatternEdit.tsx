import { TextField, TextFieldProps } from "@mui/material";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form"
import { PatternFormat } from "react-number-format";

type IProps<T extends FieldValues> = Omit<TextFieldProps, "value"> & {
  control: Control<T, any>;
  field: FieldPath<T>,
  label: string,
  fullWidth?: boolean,
  format: string,
}

export const FPatternEdit = <T extends FieldValues>(props: IProps<T>) => {
    return (
      <Controller
        name={props.field}
        control={props.control}
        render={({field, fieldState}) => (
          <PatternFormat
            customInput={TextField}
            value={field.value}
            error={fieldState.error != undefined}
            helperText={fieldState.error?.message}
            onValueChange={({ value }) => field.onChange(value)}
            format={props.format}

            inputRef={field.ref}
            variant="outlined"
            fullWidth={props.fullWidth}
            label={props.label}
            autoComplete={props.autoComplete ?? "off"}
            disabled={props.disabled}
          />
          )}
        />
    )
}