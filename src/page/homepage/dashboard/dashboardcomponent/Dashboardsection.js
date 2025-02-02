import React, { useState } from 'react';
import { Grid, Container, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import TabsSection from './TabsSection';
import PaymentDetail from './PaymentDetail';




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

      

     
          <PaymentDetail />
        
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboardsection;
