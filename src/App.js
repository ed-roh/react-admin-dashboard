import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Users from "./scenes/users";
import Invoices from "./scenes/invoices";
import Categories from "./scenes/categories";
import Bar from "./scenes/bar";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import CreateCategorie from "./components/CreateCategorie";
import Login from "./scenes/login/Login";
import CreateUser from "./components/CreateUser";
import SignalementProfile from "./scenes/signalementProfile/index";
import Oeuvres from "./scenes/oeuvres";

function AuthenticatedRoutes() {
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <>
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users">
            <Route index element={<Users />} />
            <Route path="create" element={<CreateUser />} />
          </Route>
          <Route path="/categories">
            <Route index element={<Categories />} />
            <Route path="create" element={<CreateCategorie />} />
          </Route>
          <Route path="/oeuvres" element={<Oeuvres />} />
          <Route path="/signalement-profile" element={<SignalementProfile />} />
          <Route path="/bar" element={<Bar />} />
          <Route path="/pie" element={<Pie />} />
          <Route path="/line" element={<Line />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/geography" element={<Geography />} />
          <Route path="/*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}

function App() {
  const [theme, colorMode] = useMode();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(token ? true : false);
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Routes>
            {isAuthenticated ? (
              <Route path="/*" element={<AuthenticatedRoutes />} />
            ) : (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </>
            )}
          </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
