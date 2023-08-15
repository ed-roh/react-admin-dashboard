import { useState } from "react";
import { Routes, Route } from "react-router-dom";


import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import AuthUI from "./components/AuthUI";
import { useEffect } from "react";
import FirstLogin from "./components/FirstLogin";
import SimpleBackDrop from "./components/SimpleBackDrop";
import { supabase } from "./supabase";
import { useUser } from "@supabase/auth-helpers-react";

import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./scenes/dashboard";
import PolicyandProcedure from "./scenes/policyandprocedure";
import DocumentLibrary from "./scenes/documents";
import RiskScorecard from "./scenes/riskscorecard";
import RiskRegister from "./scenes/riskregister";
import Assessments from "./scenes/assessments";
import Meetings from "./scenes/meetings";
import Training from "./scenes/training";
import Company from "./scenes/company";
import People from "./scenes/people";
import Vendors from "./scenes/vendors";
import Hardware from "./scenes/hardware";
import Software from "./scenes/software";
import Settings from "./scenes/settings";
import Billing from "./scenes/billing";
import Probes from "./scenes/probes";
import Notifications from "./scenes/notifications";
import Profile from "./scenes/profile";



function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [firstTime, setfirstTime] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [domainInfo, setDomainInfo] = useState(null);  
  
  const user = useUser();

    useEffect(() => {
      getUserInfo();
      getDomainInfo();
    }, [user]);
  
    async function getUserInfo() {
      setIsLoading(true);
      try {
        let { data, error, status } = await supabase
          .from('users')
          .select(`*`)
          .eq('id',  user.id)
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
          .eq('domain', user.email.split("@")[1])
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
        {!user ? <AuthUI /> : (
          <div className="app">
          <Sidebar userInfo={userInfo} isSidebar={isSidebar} />
          <main className="content">
            <Topbar userInfo={userInfo} setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/scorecard" element={<RiskScorecard />} />
              <Route path="/assessments" element={<Assessments />} />
              <Route path="/riskregister" element={<RiskRegister />} />
              <Route path="/policyandprocedure" element={<PolicyandProcedure />} />
              <Route path="/meetings" element={<Meetings />} />
              <Route path="/training" element={<Training />} />
              <Route path="/company" element={<Company />} />
              <Route path="/people" element={<People />} />
              <Route path="/vendors" element={<Vendors />} />
              <Route path="/hardware" element={<Hardware />} />
              <Route path="/software" element={<Software />} />
              <Route path="/documents" element={<DocumentLibrary />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/probes" element={<Probes />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/profile" element={<Profile />} />

            </Routes>
            {firstTime ? <FirstLogin user={user} /> : <></>}
          </main>
        </div>
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
