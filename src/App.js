import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Analytics from "./scenes/analytics/Analytics";
import Report from "./scenes/report/Report";
import Navigation from './scenes/nav/Navigation';







function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
        <Navigation setIsSidebar={setIsSidebar} />
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path='/analytics' element={<Analytics/>} />
              <Route path="/report" element={<Report/>}/>
            </Routes>
          </main>
          
        </div>
       
      </ThemeProvider>
    </ColorModeContext.Provider>
    
  );
}

export default App;
