import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import TopBar from '../TopBar';
import axios from "axios";
import { INotification } from '../../types';

export default function NotificationForm() {
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async () => {
    await axios.post("/api/pusher", { type: 'error', message: message });
  };

  return (
    <main>
      <Box sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Paper 
          elevation={1}
          sx={{
            width: '40%',
            height: '50%'
          }}
        >
          <TopBar/>
          <Box
            sx={{
              padding: '30px'
            }}
          >
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
              Submit
            </Button>
          </Box>

        </Paper>
      </Box>
    </main>
  )
}
