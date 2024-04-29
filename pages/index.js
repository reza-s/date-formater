import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

function formater(initialDate, lastDate) {
  // Parse the input dates
  const startDate = new Date(initialDate);
  const endDate = new Date(lastDate);

  // Check if startDate is indeed older than endDate
  if (startDate >= endDate) {
      return "The first date must be older than the second date.";
  }

  // Calculate difference in milliseconds
  const diffTime = Math.abs(endDate - startDate);

  // Convert difference to days
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // Calculate weeks and days
  const weeks = Math.floor(diffDays / 7);
  const days = diffDays % 7;

  // Create output format
  return `${weeks}w${days}d`;
}

export default function dateFormater() {
  const [output, setOutput] = React.useState(''); // Add this line to create a state for the output

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const initialDate = data.get('initialDate');
    const lastDate = data.get('lastDate');
    const result = formater(initialDate, lastDate);
    setOutput(result); // Set the output state to the result
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Date Formater
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <TextField
                  autoComplete="Start Date"
                  name="initialDate"
                  required
                  fullWidth
                  id="initDate"
                  label="Start Date"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                  required
                  fullWidth
                  id="lastDate"
                  label="Last Date"
                  name="lastDate"
                  autoComplete="Last Date"
                />
              </Grid>
              <Button item xs={12}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 5, mb: 1.5, ml:2 }}
            >
              Format
            </Button>

            </Grid>
            <Grid>
            <TextField
              fullWidth
              name="output"
              label="output"
              type="output"
              id="output"
              sx={{mb: 2}}
              value={output} // Set the value to the output state
              InputProps={{
                readOnly: true, // Make the field read-only
              }}
            />
            </Grid>
            

          </Box>
        </Box>
    
      </Container>
    </ThemeProvider>
  );
}