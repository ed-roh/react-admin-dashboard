import { useState } from 'react'

import './App.css'
import { ColorModeContext, useMode } from './theme/theme'
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import TopBar from './scenes/global/TopBar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './scenes/dashboard/Dashboard';
import Team from './scenes/Team';
import Contacts from './scenes/Contacts';
import Bar from './scenes/Bar';
import Pie from './scenes/Pie';
import Line from './scenes/Line';
import FAQ from './scenes/FAQ';
import Geography from './scenes/Geography';
import Calendar from './scenes/Calendar';
import SidebarLayout from './scenes/global/SidebarLayout';
import Invoices from './scenes/Invoices';
import Form from './scenes/Form';


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const contextValue = { ...colorMode, toggleColorMode: colorMode.toggleColorMode };


  return (
    <ColorModeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='app'>
          <SidebarLayout isSidebar={isSidebar} />
          <main className='content'>
            <TopBar />
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/team' element={<Team />} />
              <Route path='/contacts' element={<Contacts />} />
              <Route path='/invoices' element={<Invoices />} />
              <Route path='/form' element={<Form />} />
              <Route path='/bar' element={<Bar />} />
              <Route path='/pie' element={<Pie />} />
              <Route path='/line' element={<Line />} />
              <Route path='/faq' element={<FAQ />} />
              <Route path='/geography' element={<Geography />} />
              <Route path='/calendar' element={<Calendar />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
