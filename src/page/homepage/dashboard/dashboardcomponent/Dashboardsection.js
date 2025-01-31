import React, { useState } from 'react';
import {
  Grid,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Tabs,
  Tab,
  TextField
} from '@mui/material';

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

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow('Paperclips (Box)', 100, 1.15),
  createRow('Paper (Case)', 10, 45.99),
  createRow('Waste Basket', 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

function Dashboardsection() {
  const [value, setValue] = useState(0);
  const [rows, setRows] = useState([
    { name: 'Ice Cream', price: 30, quantity: 2, total: 60 },
    { name: 'Gulab Jamun', price: 75, quantity: 1, total: 75 },
  ]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleQuantityChange = (index, newQuantity) => {
    const updatedRows = rows.map((row, i) =>
      i === index
        ? {
            ...row,
            quantity: newQuantity,
            total: newQuantity * row.price,
          }
        : row
    );
    setRows(updatedRows);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Container
              maxWidth="xl"
              sx={{ backgroundColor: '#FFF3E0', minHeight: '100vh', padding: 3 }}
            >
              <Typography variant="h4" sx={{ mb: 5 }}>
                Hi, Welcome back! Ram
              </Typography>

              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Desserts" {...a11yProps(0)} />
                    <Tab label="Main Course" {...a11yProps(1)} />
                    <Tab label="Appetizers" {...a11yProps(2)} />
                  </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                  <Typography variant="h6">Dessert</Typography>
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
                        {rows.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell align="right">{row.price}</TableCell>
                            <TableCell align="right">
                              <TextField
                                type="number"
                                size="small"
                                value={row.quantity}
                                onChange={(e) =>
                                  handleQuantityChange(index, Number(e.target.value))
                                }
                                inputProps={{ min: 0 }}
                                sx={{ width: '60px' }} 
                              />
                            </TableCell>
                            <TableCell align="right">{row.total}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CustomTabPanel>

                <CustomTabPanel value={value} index={1}>
                  <Typography variant="h6">Main Course</Typography>
                  <p>Here is the main course content.</p>
                </CustomTabPanel>

                <CustomTabPanel value={value} index={2}>
                  <Typography variant="h6">Appetizers</Typography>
                  <p>Here are some delicious Appetizers!</p>
                </CustomTabPanel>
              </Box>
            </Container>
          </Grid>

          {/* Sidebar Detail */}
          <Grid item xs={12} md={4}>
            <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
              <Table aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={3}>
                      Details
                    </TableCell>
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Desc</TableCell>
                    <TableCell align="right">Qty.</TableCell>
                    <TableCell align="right">Unit</TableCell>
                    <TableCell align="right">Sum</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.desc}>
                      <TableCell>{row.desc}</TableCell>
                      <TableCell align="right">{row.qty}</TableCell>
                      <TableCell align="right">{row.unit}</TableCell>
                      <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell rowSpan={3} />
                    <TableCell colSpan={2}>Subtotal</TableCell>
                    <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tax</TableCell>
                    <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                    <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Dashboardsection;
