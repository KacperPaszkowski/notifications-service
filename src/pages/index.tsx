import * as React from 'react';
import NotificationForm from '../components/modules/NotificationForm';
import NotificationManager from '../components/modules/NotificationManager';
import { FilterContextProvider } from '@/context/FilterContext';

export default function Home() {
  return (
    <>
      <header>
        <title>Notifications</title>
      </header>
      <main>
        <FilterContextProvider>
          <NotificationForm/>
          <NotificationManager/>
        </FilterContextProvider>
      </main>
    </>
  )
}
