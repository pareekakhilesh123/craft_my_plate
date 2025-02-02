import { useTheme } from '@mui/material/styles';
import { Typography, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Avatar , CssBaseline } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useNavigate } from "react-router-dom"; 

export default function Appbar() {
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
  const navigate = useNavigate();
  function handleClick() {
    navigate("/order");
  }

  return (
    <>
      <CssBaseline />
      <AppBar elevation={0} position="sticky" sx={{ backgroundColor: '#FF6F00' }}>
        <Toolbar>
          <IconButton 
            edge="start" 
            color="inherit" 
            aria-label="menu" 
            onClick={toggleDrawer} 
            sx={{ fontSize: '30px' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Food Delivery Dashboard
          </Typography>
          
       
          <Avatar 
            alt="Profile" 
            src="/profile-photo.jpg" 
            sx={{ width: 40, height: 40, marginLeft: 2 }} 
          />
        </Toolbar>
      </AppBar>

      <Drawer 
        open={openDrawer} 
        onClose={toggleDrawer} 
        anchor="left" 
        sx={{ width: 240, flexShrink: 0, '& .MuiDrawer-paper': { width: 240 } }}
      >
        <List sx={{ backgroundColor: '#FFCC80', paddingTop: 2 }}>
          <ListItem button>
            <ListItemText primary="Dashboard" />
          </ListItem>

          <ListItem button onClick={handleClick}>
            <ListItemText primary="Orders" />
            
          </ListItem>
      
          <ListItem button>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Drawer>

     
    </>
  );
}
