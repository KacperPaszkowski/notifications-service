import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TopBar from '../TopBar';
import axios from "axios";
import { INotification } from '../../types';

function SendNotification() {
    const [message, setMessage] = useState<string>("");
    const [notificationType, setNotificationType] = useState<string>("info");

    const handleSubmit = async () => {
        await axios.post("/api/pusher", { type: notificationType, message: message });
    };

    const handleChange = (event: SelectChangeEvent) => {
        setNotificationType(event.target.value as string);
    };

    return ( 
        <Box
            sx={{
              padding: '30px'
            }}
          >
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Notification type</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={notificationType}
                    label="Notification type"
                    onChange={handleChange}
                >
                    <MenuItem value={'error'}>Error</MenuItem>
                    <MenuItem value={'warning'}>Warning</MenuItem>
                    <MenuItem value={'info'}>Info</MenuItem>
                    <MenuItem value={'success'}>Success</MenuItem>
                </Select>
            </FormControl>
            <TextField
              label="Message"
              variant="outlined"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button 
              variant="contained" 
              color="primary" 
              type="submit"
              sx={{
                marginTop: '20px'
              }}
              onClick={handleSubmit}
              >
              Send notification
            </Button>
          </Box>
     );
}

export default SendNotification;