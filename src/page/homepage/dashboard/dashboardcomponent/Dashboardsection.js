import React, { useState } from 'react';
import { Grid, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import TabsSection from './TabsSection';
import PaymentDetail from './PaymentDetail';


const TAX_RATE = 0.07;

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rowsData = [
  { desc: 'Paperclips (Box)', qty: 100, unit: 1.15, price: 115 },
  { desc: 'Paper (Case)', qty: 10, unit: 45.99, price: 459.9 },
  { desc: 'Waste Basket', qty: 2, unit: 17.99, price: 35.98 },
];

const invoiceSubtotal = subtotal(rowsData);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

function Dashboardsection() {
  const user = useSelector((state) => state.user);
  const [rows, setRows] = useState([
    { name: 'Ice Cream', price: 30, quantity: 2, total: 60 },
    { name: 'Gulab Jamun', price: 75, quantity: 1, total: 75 },
  ]);

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
    <Container maxWidth="xl" sx={{ backgroundColor: '#FFF3E0', minHeight: '100vh', padding: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <TabsSection rows={rows} handleQuantityChange={handleQuantityChange} user={user} />
        </Grid>
        <Grid item xs={12} md={4}>
          <PaymentDetail
            rows={rowsData}
            invoiceSubtotal={invoiceSubtotal}
            invoiceTaxes={invoiceTaxes}
            invoiceTotal={invoiceTotal}
          />
        
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboardsection;
