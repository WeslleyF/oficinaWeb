import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { ReactNode, useState } from 'react';
import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

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
      <Drawer sx={{ width: drawerWidth, '& .MuiDrawer-paper': { width: drawerWidth,}}} variant="persistent" anchor="left" open={open} onClick={handleDrawerClose}>
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
                  <HomeIcon />
                </ListItemIcon>
                <Link to="/">Início</Link>
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <Link to="/cliente">Cliente</Link>
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <Link to="/serviço">Serviço</Link>
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