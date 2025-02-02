import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Appbar from '../dashboardcomponent/Appbar';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Paper, Grid } from '@mui/material';

 
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function Order() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/orders')
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  return (
    <div>
      <Appbar />

      {/* Table View */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <TableContainer component={Paper} sx={{ marginTop: '50px', marginLeft: '40px' }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Order Id</StyledTableCell>
                  <StyledTableCell align="right">User ID</StyledTableCell>
                  <StyledTableCell align="right">Total Amount</StyledTableCell>
                  <StyledTableCell align="right">Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <StyledTableRow key={order.id}>
                    <StyledTableCell component="th" scope="row">
                      {order.id}
                    </StyledTableCell>
                    <StyledTableCell align="right">{order.userId}</StyledTableCell>
                    <StyledTableCell align="right">{order.totalAmount}</StyledTableCell>
                    <StyledTableCell align="right">{order.status}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}

export default Order;
