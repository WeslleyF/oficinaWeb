import { Box } from "@mui/material";
import { ReactNode } from "react"

interface Iprops {
  children: ReactNode,
  handleSubmit: (data: any) => void,
}

export const Form = (props : Iprops) => {
  return(
    <Box component={"form"} onSubmit={props.handleSubmit}>
      {props.children}
    </Box>
  )
}