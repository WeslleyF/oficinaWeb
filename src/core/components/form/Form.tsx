import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react"

interface Iprops {
  children: ReactNode,
  handleSubmit?: (data: any) => void,
  boxPros?: BoxProps;
}

export const Form = (props : Iprops) => {  
  return(
    <Box component={"form"} onSubmit={props.handleSubmit} {...props.boxPros}>
      {props.children}
    </Box>
  )
}