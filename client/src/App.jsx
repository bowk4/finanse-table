import React from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { IntervalBlock } from './components/Interval-block';
import { EnhancedTable } from './components/table/Table-Body';
import { useSelector } from 'react-redux';
import { CreateAuthorizationForm } from './components/authorization/Authorization';


function App() {
  const formAuthorizationStatus = useSelector(state => state.finance.isFormAuthorizationOpen);

  return (
    <>
      {(formAuthorizationStatus) ? <CreateAuthorizationForm /> : ''}
      <Container sx={{ padding: 3 }} maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={10}>
            <EnhancedTable />
          </Grid>
          <Grid item xs={2}>
            <IntervalBlock />
          </Grid>
        </Grid>
      </Container >
    </>
  );
}

export default App;
