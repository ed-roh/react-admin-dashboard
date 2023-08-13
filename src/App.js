import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { supabase } from "./supabase";
import AuthUI from "./components/AuthUI";
import { useEffect } from "react";
import FirstLogin from "./components/FirstLogin";
import SimpleBackDrop from "./components/SimpleBackDrop";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [firstTime, setfirstTime] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [domainInfo, setDomainInfo] = useState(null);  

  useEffect(() => {
    setSession(supabase.auth.getSession());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (_event === "SIGNED_OUT") {
        setSession(null);
      }
      if (_event === "PASSWORD_RECOVERY") {
        setSession(null);
      }
    });

  }, []);


    useEffect(() => {
      getUserInfo();
      getDomainInfo();
    }, [session]);
  
    async function getUserInfo() {
      setIsLoading(true);
      try {
        let { data, error, status } = await supabase
          .from('users')
          .select(`*`)
          .eq('id',  session.user.id)
          .single();
  
        if (error && status !== 406) {
          throw error;
        }
  
        if (data) {
          setUserInfo(data);
        }
      } catch (error) {
        console.log(error);      
      }
      setIsLoading(false);
    }

    async function getDomainInfo() {
      setIsLoading(true);
      try {
        let { data, error, status } = await supabase
          .from('domains')
          .select(`*`)
          .eq('domain',session.user.email.split("@")[1])
          .single();
  
        if (error && status !== 406) {
          throw error;
        }
  
        if (data) {
          setDomainInfo(data);
          setfirstTime(false);
        } else {
          setfirstTime(true);
        }
      } catch (error) {
        setfirstTime(true);
        console.log(error);
      }
      setIsLoading(false);
    }

    

  if (isLoading) {
    return <SimpleBackDrop text="&nbsp;&nbsp;Gathering Information" />;
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {!session ? <AuthUI /> : (
          <div className="app">
          <Sidebar userInfo={userInfo} isSidebar={isSidebar} />
          <main className="content">
            <Topbar userInfo={userInfo} setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
            {firstTime ? <FirstLogin user={session.user} /> : <></>}
          </main>
        </div>
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
