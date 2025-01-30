import React from 'react';
import { Card, Container, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

// Define the TabPanelProps type
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
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

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Dashboardsection() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Container maxWidth="xl" sx={{ backgroundColor: '#FFF3E0', minHeight: '100vh', padding: 3 }}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back! ram
        </Typography>

        <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Appetizers" {...a11yProps(0)} />
            <Tab label=" Main Course" {...a11yProps(1)} />
            <Tab label="  Desserts" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
        Appetizers
          <Card >
            
          </Card>
        </CustomTabPanel>


        <CustomTabPanel value={value} index={1}>
        Main Course
        </CustomTabPanel>


        <CustomTabPanel value={value} index={2}>
        Desserts
        </CustomTabPanel>
      </Box>
      </Container>

      
    </div>
  );
}

export default Dashboardsection;
