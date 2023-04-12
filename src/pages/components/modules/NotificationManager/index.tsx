import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import Pusher from "pusher-js";
import Alert, { AlertColor } from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import styles from './NotificationManager.module.css'
import { FilterContext, IFilter } from '@/context/FilterContext';
import useStateRef from 'react-usestateref';
import { INotification } from '../../types';

function NotificationManager() {
    const [notifications, setNotifications] = useState<INotification[]>([]);
    const {filter, setFilter} = useContext(FilterContext)
    const [upFilter, setUpFilter, upFilterRef] = useStateRef();

    useEffect(() => {
        setUpFilter(filter)
    }, [filter])

    useEffect(() => {
        const pusher = new Pusher(process.env.NEXT_PUBLIC_KEY ? process.env.NEXT_PUBLIC_KEY : "", {
          cluster: "eu",
        });
    
        const channel = pusher.subscribe("notification-service");

        channel.bind("notification-event", function (data: INotification) {
            if(!upFilterRef.current) return
            if((upFilterRef.current as IFilter).acceptSender && (upFilterRef.current as IFilter).acceptSender != data.sender) return
            if(!(upFilterRef.current as IFilter)[data.type as keyof IFilter]) return
            setNotifications(oldNotifications => [...oldNotifications, data])
        });
    
        return () => {
          pusher.unsubscribe("notification-service");
        };
      }, []);

    const handleNotificationClose = (idx: number) => {
        setNotifications([...notifications.filter((notification, nidx) => (
            nidx != idx
        ))])
    }

    return ( 
        <div className={styles.notificationContainer}>
            {notifications.map((notification, idx) => (
                <Alert 
                  key={idx} 
                  severity={notification.type as AlertColor}
                  className={styles.notificationItem}
                  onClose={() => handleNotificationClose(idx)}
                >
                    <AlertTitle
                      sx={{
                        textTransform: 'capitalize'
                    }}>
                        {notification.type}
                    </AlertTitle>
                    {notification.message} — check it out!
                </Alert>
            ))}
        </div>
     );
}

export default NotificationManager;