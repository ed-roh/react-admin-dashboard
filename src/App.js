import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import AuthUI from "./components/AuthUI";

import FirstLogin from "./components/FirstLogin";
import SimpleBackDrop from "./components/SimpleBackDrop";

import Layout from "./components/Layout";

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
import Network from "./scenes/network";
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
  const [isLoading, setIsLoading] = useState(true);
  const [firstTime, setfirstTime] = useState(false);
  
  const user = useUser();
  const supabase = useSupabaseClient();

    useEffect(() => {
      getDomainInfo();
    }, [user]);

  
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
    return <SimpleBackDrop />;
  }

  
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {!user ? <AuthUI view="sign_in"/> : (
          <>
            <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
                <Route path="/riskscorecard" element={<RiskScorecard />} />
                <Route path="/assessments" element={<Assessments />} />
                <Route path="/riskregister" element={<RiskRegister />} />
                <Route path="/policyandprocedure" element={<PolicyandProcedure />} />
                <Route path="/meetings" element={<Meetings />} />
                <Route path="/training" element={<Training />} />
                <Route path="/company" element={<Company />} />
                <Route path="/people" element={<People />} />
                <Route path="/people" element={<People />} />
                <Route path="/network" element={<Network />} />
                <Route path="/vendors" element={<Vendors />} />
                <Route path="/hardware" element={<Hardware />} />
                <Route path="/software" element={<Software />} />
                <Route path="/documents" element={<DocumentLibrary />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/billing" element={<Billing />} />
                <Route path="/probes" element={<Probes />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Routes>
            {firstTime ? <FirstLogin /> : <></>}
            </>
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
