import { Autocomplete, TextField } from "@mui/material";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form"

interface IProps<T extends FieldValues> {
  control: Control<T, any>;
  field: FieldPath<T>,
  label: string,
  listField: string,
  keyField: string,
  fullWidth?: boolean,
  listItens: any[],
}

export function FAutoComplete<T extends FieldValues>(props: IProps<T>) {
  return (
    <Controller
      control={props.control}
      name={props.field}
      render={({ field: { ref, onChange, ... field } }) => (
        <Autocomplete
          options={props.listItens}
          onChange={(_, data) => onChange(data ? data[props.keyField] : null)}
          value={props.listItens?.find(li =>li[props.keyField] === field.value) ?? null}
          getOptionLabel={(option) => option[props.listField] ?? ""}
          isOptionEqualToValue={(option, value) => option == value}
          fullWidth={props.fullWidth}
          renderInput={(params) => (
            <TextField
              {...params}
              {...field}
              inputRef={ref}
              label={props.label}
              margin="dense"
              // sx={{paddingRight: 1}}
              />
          )}
        />)}
    />   
  )
}
        
  
      
