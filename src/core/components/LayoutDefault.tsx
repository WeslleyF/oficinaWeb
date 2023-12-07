import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { ReactNode, useState } from 'react';
import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';

interface IProps {
  children: ReactNode
} 

export const LayoutDefault = (props : IProps) => {
  const drawerWidth = 240;
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  }

  const handleDrawerClose = () => {
    setOpen(false);
  }
  
  return (
    <Box>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <IconButton color="inherit" onClick={handleDrawerOpen} edge="start" sx={{ mr: 2, ...(open && { display: 'none' }) }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
             Gestor Oficina
           </Typography>
        </Toolbar>
      </AppBar>
      <Drawer sx={{ width: drawerWidth, '& .MuiDrawer-paper': { width: drawerWidth,}}} variant="persistent" anchor="left" open={open}>
        <Box display='flex' alignItems='center' justifyContent='flex-end'>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary={"Cliente"} />
            </ListItemButton>
            </ListItem>
        </List>
        <Divider />
      </Drawer>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', marginTop: 4, marginLeft: 2, paddingTop: 5, bgcolor: 'background.paper', borderRadius: 1, }}>
        {props.children} 
      </Box>
    </Box>
  );
}