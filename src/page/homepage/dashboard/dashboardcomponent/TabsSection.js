import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { menuInfo, onQuantityChange } from '../../../../slices/menuSlice'; 
import {Box,Typography,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Tabs,Tab,TextField,} from '@mui/material';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const TabsSection = ({ user }) => {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const menuData = useSelector((state) => state.menu);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/menu');
        const menuItems = response.data.data;
        dispatch(menuInfo(menuItems)); 
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };

    fetchMenu();
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleQuantityChange = (index, newQuantity) => {
    dispatch(onQuantityChange({
      index, newQuantity
    })); 
    };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back! {user.name}
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Desserts" {...a11yProps(0)} />
          <Tab label="Main Course" {...a11yProps(1)} />
          <Tab label="Appetizers" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Typography variant="h6">Desserts</Typography>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell>Dessert</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menuData.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <button
                        onClick={() => handleQuantityChange(index, Math.max(row.quantity - 1, 0))}
                        style={{
                          padding: '5px',
                          margin: '0 5px',
                          borderRadius: '5px',
                          border: '1px solid #ccc',
                          background: '#f0f0f0',
                          cursor: 'pointer',
                        }}
                      >
                        -
                      </button>
                      <TextField
                        type="text"
                        size="small"
                        value={row.quantity || 0}
                        onChange={(e) =>
                          handleQuantityChange(index, Math.max(Number(e.target.value), 0))
                        }
                        inputProps={{ min: 0 }}
                        sx={{ width: '60px' }}
                      />
                      <button
                        onClick={() => handleQuantityChange(index, (row.quantity || 0) + 1)}
                        style={{
                          padding: '5px',
                          margin: '0 5px',
                          borderRadius: '5px',
                          border: '1px solid #ccc',
                          background: '#f0f0f0',
                          cursor: 'pointer',
                        }}
                      >
                        +
                      </button>
                    </Box>
                  </TableCell>
                  <TableCell align="right">{row.total || 0}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CustomTabPanel>



{/* tab 2  Main Course*/}

      <CustomTabPanel value={value} index={1}>
        <Typography variant="h6">Main Course</Typography>
        <p>Here is the main course content.</p>
      </CustomTabPanel>

{/* tab 2  Appetizers*/}

      <CustomTabPanel value={value} index={2}>
        <Typography variant="h6">Appetizers</Typography>
        <p>Here are some delicious Appetizers!</p>
      </CustomTabPanel>


    </Box>
  );
};

export default TabsSection;
