import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./scenes/global/Sidebar";
import TopBar from "./scenes/global/Topbar";
import Home from "./scenes/home";
import Dashboard from "./scenes/dashboard";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import Indicacao from "./scenes/indicacao";
import Premios from "./scenes/premios";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Fidelidade from "./scenes/fidelidade";
import Entrar from "./scenes/acesso/entrar";
import Cadastro from "./scenes/acesso/cadastro";
import RedefinirSenha from "./scenes/acesso/senha";

function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();

  const pathsToHideSidebar = ["/", "/entrar", "/cadastro", "/senha"];
  const shouldHideSidebar = pathsToHideSidebar.includes(location.pathname);

  const pathsToHideTopBar = ["/", "/entrar", "/cadastro", "/senha"];
  const shouldHideTopBar = pathsToHideTopBar.includes(location.pathname);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline >
          <div className="app">
            {!shouldHideSidebar && <Sidebar />}
            <main className="content">
              {!shouldHideTopBar && <TopBar />}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/entrar" element={<Entrar />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/senha" element={<RedefinirSenha />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/indicacao" element={<Indicacao />} />
                <Route path="/premios" element={<Premios />} />
                <Route path="/fidelidade" element={<Fidelidade />} />
                <Route path="/calendar" element={<Calendar />} />
              </Routes>
            </main>
          </div>
        </CssBaseline>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
