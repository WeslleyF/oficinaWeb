import { Box, BoxProps } from "@mui/material"
import { ReactNode } from "react"

interface IProps extends BoxProps {
  children?: ReactNode;
}

export const BarraAcao = (props: IProps) => { 
    return (
      <Box {...props} sx={{border: 1, width: '100%', height: props.height ?? '3.5rem', marginBottom: 1, padding: 1, borderColor: 'grey.500', borderRadius: 1,}}>
        {props.children}
      </Box>
    )
}