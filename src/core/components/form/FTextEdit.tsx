import { TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form"

interface IProps {
  control: Control;
  field: string,
  label: string,
  fullWidth?: boolean,
}

export const FTextEdit = (props: IProps) => {
    return (
      <Controller
        name="url"
        control={props.control}
        defaultValue=""
        render={({field, fieldState}) => (
          <TextField
            {...field}
            inputRef={field.ref}
            variant="outlined"
            fullWidth={props.fullWidth}
            value={field.value}
            onChange={field.onChange}
            error={fieldState.error != undefined}
            helperText={fieldState.error?.message}
            label="props.label"
          />
          )}
        />
    )
}