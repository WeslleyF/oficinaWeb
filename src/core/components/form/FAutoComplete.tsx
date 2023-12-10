import { Autocomplete, TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form"

interface IProps {
  control: Control;
  field: string,
  label: string,
  fullWidth?: boolean,
  list: object[],
}

export function FAutoComplete(props: IProps) {
  return (
    <Controller
      control={props.control}
      name={props.field}
      render={({ field: { ref, onChange, ... field } }) => (
        <Autocomplete
          options={props.list}
          onChange={(_, data) => onChange(data)}
          value={field.value}
          renderInput={(params) => (
            <TextField
              {...params}
              {...field}
              fullWidth
              inputRef={ref}
              variant="filled"
              />
          )}
        />)}
    />   
  )
}
        
  
      
