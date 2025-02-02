import React from 'react'; 
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Card, Button, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#FFF0DC',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: '#543A14',
  borderRadius: '8px',
  boxShadow: 'none',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

function HomePageSection() {
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#FFF0DC', minHeight: '100vh' }}>
      <Grid container sx={{ height: "500px" }}>
        <Grid item xs={12} md={8}>
          <Item>
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
              Welcome to the Food Ordering System
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              Order delicious meals with just a few clicks! Browse our menu, add items to your cart, and enjoy fresh food delivered to your door.
            </Typography>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#FF8C42', color: '#fff', padding: '10px 20px', fontSize: '16px' }}
            >
              View All
            </Button>
          </Item>
        </Grid>

        <Grid item xs={12} md={4}>
          <Item>
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
              Quick Links
            </Typography>
            <Button
              variant="outlined"
              sx={{ marginBottom: 1, width: '100%', color: '#543A14', borderColor: '#543A14', textTransform: 'none' }}
              component={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              variant="outlined"
              sx={{ marginBottom: 1, width: '100%', color: '#543A14', borderColor: '#543A14', textTransform: 'none' }}
              component={Link}
              to="/register"
            >
              Signup
            </Button>
            <Button
              variant="outlined"
              sx={{ marginBottom: 1, width: '100%', color: '#543A14', borderColor: '#543A14', textTransform: 'none' }}
            >
              Order History
            </Button>
          </Item>
        </Grid>
      </Grid>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4,
          flexWrap: 'wrap',
          marginTop: 4,
        }}
      >
        {[
          { icon: <LoginIcon />, label: 'Login' },
          { icon: <MenuBookIcon />, label: 'View Menu' },
          { icon: <ShoppingCartIcon />, label: 'Cart' },
          { icon: <LocalDiningIcon />, label: 'Order' },
        ].map((item, index) => (
          <Card
            key={index}
            sx={{
              height: '150px',
              width: '150px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '50%',
              backgroundColor: '#FFF0DC',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          >
            {item.icon}
            <Typography variant="body1" sx={{ marginTop: 1, fontWeight: 'bold', color: '#543A14' }}>
              {item.label}
            </Typography>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default HomePageSection;
