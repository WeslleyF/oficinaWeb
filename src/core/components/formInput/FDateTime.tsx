import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface IProps<T extends FieldValues> {
  control: Control<T, any>;
  field: FieldPath<T>,
  label: string,
  fullWidth?: boolean,
}

export const FDateTime = <T extends FieldValues>(props: IProps<T>) => {
    return (
      <Controller
        name={props.field}
        control={props.control}
        render={({field, fieldState}) => (
          <DatePicker
            {...field}
            label={props.label}
            value={field.value}
            onChange={(newValue) => field.onChange(newValue)}
            sx={props.fullWidth ? {width: '100%'} : undefined}
            slotProps={{
              textField: {
                helperText: fieldState.error?.message,
                error: fieldState.error ? true : false,
              },
            }}
          />
          )}
        />
    )
}