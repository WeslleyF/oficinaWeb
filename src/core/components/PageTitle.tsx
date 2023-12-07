import { Typography } from "@mui/material"

interface IProps {
    children: string
}

export const PageTitle = (props: IProps) =>{
    return ( 
      <Typography variant="h5" component="h5">{props.children}</Typography>
    )
}