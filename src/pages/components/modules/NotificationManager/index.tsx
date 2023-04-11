import * as React from 'react';
import { useState, useEffect } from 'react';
import Pusher from "pusher-js";
import Alert, { AlertColor } from '@mui/material/Alert'
import styles from './NotificationManager.module.css'
import { INotification } from '../../types';

function NotificationManager() {
    const [notifications, setNotifications] = useState<INotification[]>([]);

    useEffect(() => {
        const pusher = new Pusher(process.env.NEXT_PUBLIC_KEY ? process.env.NEXT_PUBLIC_KEY : "", {
          cluster: "eu",
        });
    
        const channel = pusher.subscribe("notification-service");

        channel.bind("notification-event", function (data: INotification) {
          setNotifications(oldNotifications => [...oldNotifications, data])
        });
    
        return () => {
          pusher.unsubscribe("notification-service");
        };
      }, []);

    return ( 
        <div className={styles.notificationContainer}>
            {notifications.map((notification) => (
                <Alert severity={notification.type as AlertColor}>{notification.message} — check it out!</Alert>
            ))}
        </div>
     );
}

export default NotificationManager;