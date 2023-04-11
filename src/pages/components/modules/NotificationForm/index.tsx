import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TopBar from '../TopBar';

import SendNotification from './SendNotification';
import FilterNotifications from './FilterNotifications';

export default function NotificationForm() {
    const [currentPage, setCurrentPage] = useState<string>("add");
  return (
    <main>
      <Box sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        <Paper 
          elevation={1}
          sx={{
            width: '40%',
            height: '50%'
          }}
        >
          <TopBar changePage={setCurrentPage}/>
          {
            {
                "add": <SendNotification/>,
                "filter": <FilterNotifications/>
            }[currentPage]
          }
        </Paper>
      </Box>
    </main>
  )
}
