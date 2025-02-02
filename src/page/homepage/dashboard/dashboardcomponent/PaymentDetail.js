import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';

function subtotal(items) {
  return items.map(({ total }) => total).reduce((sum, i) => sum + i, 0);
}

const TAX_RATE = 0.07;

function PaymentDetail() {
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const menuData = useSelector((state) => state.menu);
  const orderList = menuData.filter(menuItem => menuItem.quantity > 0);

  const invoiceSubtotal = subtotal(orderList);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }

  const handleCheckOutClick = () => {
    setOpenDialog(true);  
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); 
  };



  const handleConfirmCheckout = async () => {
    if (invoiceTotal > 0) {
      setIsLoading(true);
      const orderData = {
        items: orderList.map(item => ({
          menuId: item.id,
          quantity: item.quantity,
        })),
        totalAmount: invoiceTotal,
        status: "Pending",
      };
      
      try {
        const response = await axios.post('http://localhost:3001/api/orders', orderData, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (response.status === 201) {
          alert("Order placed successfully!");
          handleCloseDialog(); 
           
        } else {
          alert("Failed to place order!");
        }
      } catch (error) {
        alert("Error: " + (error.response ? error.response.data : error.message));
      } finally {
        setIsLoading(false); 
      }
    }
  };
  
  return (
    <>
      <Grid
        container
        direction="row"
        sx={{
          justifyContent: "flex-end",
          alignItems: "center",
        }}>
        <Button 
          sx={{
            backgroundColor: "blue",
            color: "wheat",
          }} 
          onClick={handleCheckOutClick}
          disabled={invoiceTotal === 0}  
        >
          Check Out
        </Button>
      </Grid>

      <TableContainer component={Paper} sx={{ marginTop: '60px' }}>
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
            {orderList.map((row) => (
              <TableRow key={row.desc}>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{ccyFormat(row.total)}</TableCell>
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

      {/* Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Checkout</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to proceed with the checkout?</p>
          <p>Total: {ccyFormat(invoiceTotal)}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmCheckout} 
            color="primary"
            disabled={isLoading}  
          >
            {isLoading ? "Processing..." : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default PaymentDetail;
