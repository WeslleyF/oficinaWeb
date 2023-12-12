import { Autocomplete, TextField } from "@mui/material";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form"

interface IProps<T extends FieldValues> {
  control: Control<T, any>;
  field: FieldPath<T>,
  label: string,
  listField: string,
  keyField: string,
  fullWidth?: boolean,
  list: any[],
}

export function FAutoComplete<T extends FieldValues>(props: IProps<T>) {
  return (
    <Controller
      control={props.control}
      name={props.field}
      render={({ field: { ref, onChange, ... field } }) => (
        <Autocomplete
          options={props.list}
          onChange={(_, data) => onChange(data ?? null)}
          value={field.value ?? null}
          getOptionLabel={(option) => option[props.listField] ?? ""}
          isOptionEqualToValue={(option, value) => option == value}
          fullWidth={props.fullWidth}
          renderInput={(params) => (
            <TextField
              {...params}
              {...field}
              inputRef={ref}
              label={props.label}
              />
          )}
        />)}
    />   
  )
}
        
  
      
