import * as React from 'react';
import NotificationForm from './components/modules/NotificationForm';
import NotificationManager from './components/modules/NotificationManager';

export default function Home() {
  return (
    <main>
      <NotificationForm/>
      <NotificationManager/>
    </main>
  )
}
