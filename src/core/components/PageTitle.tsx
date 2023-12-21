import { Typography } from "@mui/material"

interface IProps {
    children: string
}

export const PageTitle = (props: IProps) =>{
    return ( 
      <Typography variant="h5" component="h5" sx={{mb: 1.5}}>{props.children}</Typography>
    )
}