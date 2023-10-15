import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./scenes/estrutura/Sidebar";
import TopBar from "./scenes/estrutura/Topbar";
import Home from "./scenes/home";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Fidelidade from "./scenes/fidelidade";

function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();

  const pathsToHideSidebar = ["/", "/entrar", "/cadastro"];
  const shouldHideSidebar = pathsToHideSidebar.includes(location.pathname);

  const pathsToHideTopBar = ["/", "/entrar", "/cadastro"];
  const shouldHideTopBar = pathsToHideTopBar.includes(location.pathname);

  return (
    <div className="app">
      {!shouldHideSidebar && <Sidebar />}
      <main className="content">
      {!shouldHideTopBar && <TopBar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard theme={theme} />} />
          <Route path="/team" element={<Team theme={theme} />} />
          <Route path="/contacts" element={<Contacts theme={theme} />} />
          <Route path="/invoices" element={<Invoices theme={theme} />} />
          <Route path="/form" element={<Form theme={theme} />} />
          <Route path="/bar" element={<Bar theme={theme} />} />
          <Route path="/pie" element={<Pie theme={theme} />} />
          <Route path="/line" element={<Line theme={theme} />} />
          <Route path="/faq" element={<FAQ theme={theme} />} />
          <Route path="/fidelidade" element={<Fidelidade />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/geography" element={<Geography />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
