import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import SimpleBackDrop from "../../components/SimpleBackDrop";

import { Box, Typography, TextField } from "@mui/material";
import { useProfile } from "utils/profile";



const Company = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [companyInfo, setCompanyInfo] = useState([]);
  const [domainInfo, setDomainInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const profile = useProfile();
  const user = profile.user;
  const supabase = useSupabaseClient();

  useEffect(() => {
    if (user) {
      getCompany();
      getDomains();
    }
  }, [user]);
  
  const handleCompanyInfoChange = (field) => (e) => {
    setCompanyInfo({
      ...companyInfo,
      [field]: e.target.value,
    });
  };

  const handleDomainInfoChange = (field) => (e) => {
    setDomainInfo({
      ...domainInfo,
      [field]: e.target.value,
    });
  };

  async function getCompany() {
    setIsLoading(true);
    let { data, error } = await supabase
      .from("customers")
      .select(`*`)
      .eq("id", profile.customer.id);
    if (data !== null) {
      console.log(data[0].name)
      setCompanyInfo(data[0]);
    } else {
      alert("Error loading documents");
      console.log(error);
    }
    setIsLoading(false);
  }

  async function getDomains() {
    setIsLoading(true);
    let { data, error } = await supabase
      .from("domains")
      .select(`*`)
      .eq("customer_id", profile.customer.id);
    if (data !== null) {
      setDomainInfo(data[0]);
    } else {
      alert("Error loading documents");
      console.log(error);
    }
    setIsLoading(false);
  }
  
  if (isLoading) {
    return <SimpleBackDrop />;
  }
  
  return (
    <>
    <Box m="30px 30px">
      <h1>Company Profile</h1>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <Typography variant="h6">Organization Information</Typography>

            <TextField
              label="Company Name"
              value={companyInfo.name}
              onChange={handleCompanyInfoChange("name")}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Address"
              value={companyInfo.address}
              onChange={handleCompanyInfoChange("address")}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Phone Number"
              value={companyInfo.phone || ""}
              onChange={handleCompanyInfoChange("phone")}
              margin="normal"
            />
            <TextField
              label="Industry"
              value={companyInfo.industry}
              onChange={handleCompanyInfoChange("industry")}
              margin="normal"
            />

            <Typography variant="h6">Social Media</Typography>
            <TextField
              label="Website"
              value={companyInfo.website}
              onChange={handleCompanyInfoChange("website")}
              margin="normal"
            />
            <TextField
              label="Facebook"
              value={companyInfo.facebook}
              onChange={handleCompanyInfoChange("facebook")}
              margin="normal"
            />
            <TextField
              label="LinkedIn"
              value={companyInfo.linkedin}
              onChange={handleCompanyInfoChange("linkedin")}
              margin="normal"
            />
            <TextField
              label="Instagram"
              value={companyInfo.instagram}
              onChange={handleCompanyInfoChange("instagram")}
              margin="normal"
            />
            <TextField
              label="Twitter"
              value={companyInfo.twitter}
              onChange={handleCompanyInfoChange("twitter")}
              margin="normal"
            />
            <TextField
              label="YouTube"
              value={companyInfo.youtube}
              onChange={handleCompanyInfoChange("youtube")}
              margin="normal"
            />
          </Box>
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
    <Typography variant="h6">Domain Information</Typography>

    <TextField
        label="Domain Name"
        value={domainInfo.domain || ""}
        
        onChange={handleDomainInfoChange("domain")}
        margin="normal"
      />
      <TextField
        label="Email Provider"
        value={domainInfo.mx || ""}
        
        onChange={handleDomainInfoChange("mx")}
        margin="normal"
      />
      <TextField
        label="DNS Provider"
        value={domainInfo.ns || ""}
        
        onChange={handleDomainInfoChange("ns")}
        margin="normal"
      />
      <TextField
        label="Web Hosting Provider"
        value={domainInfo.hosting || ""}
        
        onChange={handleDomainInfoChange("hosting")}
        margin="normal"
      />
      <TextField
        label="Website Technology"
        value={domainInfo.webserver || ""}
        onChange={handleDomainInfoChange("webserver")}
        margin="normal"
      />
    </Box>
   </Box>
   </>
  );
}

export default Company;
