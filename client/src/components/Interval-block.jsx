import { useDispatch, useSelector } from 'react-redux';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { memo, useRef, useState } from 'react';
import { AntSwitch } from '../customization/customization-switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { setPriceTickersArray, FORM_AUTHORIZATION_OPEN } from '../RTK/reducers';
const { io } = require("socket.io-client");



const IntervalBlock = memo(() => {
  const [interval, setInterval] = useState(30);
  const socket = useRef();
  const dispatch = useDispatch();
  const isAuthorized = useSelector(state => state.finance.isAuthorized);


  const handleConnectSocket = (e) => {
    if (e.target.checked) {
      socket.current = io.connect('http://localhost:4000');
      socket.current.emit('start', interval);
      socket.current.on('ticker', function (response) {
        const res = Array.isArray(response) ? response : [response];
        dispatch(setPriceTickersArray(res));
      })
    } else {
      socket.current.close();
    }
  }

  const handleChangeInterval = (e) => {
    setInterval(e.target.value);
    socket.current.emit('setNewInterval', e.target.value);
  }


  return (
    <>
      <FormControl >
        <Tooltip title="Switch on/off scan" placement="right" >
          <Stack direction="row" spacing={1} alignItems="center" >
            <Typography>Off</Typography>
            <AntSwitch inputProps={{ 'aria-label': 'ant design' }} disabled={!isAuthorized}
              onChange={(e) => { isAuthorized ? handleConnectSocket(e) : dispatch(FORM_AUTHORIZATION_OPEN()) }} />
            <Typography>On</Typography>
          </Stack>
        </Tooltip>
      </FormControl>

      <FormControl sx={{ marginTop: 3 }} >

        <InputLabel id="demo-simple-select-helper-label">Scan interval:</InputLabel>
        <Tooltip title="Change scan interval" placement="right" >
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={interval}
            label="Scan interval:"
            onChange={handleChangeInterval} >
            <MenuItem value={30}>0.30 min</MenuItem>
            <MenuItem value={60}>1 min</MenuItem>
            <MenuItem value={90}>1.30 min</MenuItem>
            <MenuItem value={120}>2 min</MenuItem>
            <MenuItem value={150}>2.30 min</MenuItem>
            <MenuItem value={180}>3 min</MenuItem>
          </Select>
        </Tooltip>
      </FormControl>

    </>
  );
});

export { IntervalBlock }

