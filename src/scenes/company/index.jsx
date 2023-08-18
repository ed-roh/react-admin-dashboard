import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import SimpleBackDrop from "../../components/SimpleBackDrop";

import { Box, Typography, TextField } from "@mui/material";



const Company = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [companyInfo, setCompanyInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const user = useUser();
  const supabase = useSupabaseClient();

  useEffect(() => {
    if (user) {
      getCompany();
    }
  }, [user]);
  
  const handleCompanyInfoChange = (field) => (e) => {
    setCompanyInfo({
      ...companyInfo,
      [field]: e.target.value,
    });
  };

  async function getCompany() {
    setIsLoading(true);
    let { data, error } = await supabase
      .from("customers")
      .select(`*`)
      .eq("id", user.id);
    if (data !== null) {
      console.log(data[0].name)
      setCompanyInfo(data[0]);
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
    <Box m="30px 30px" height="75vh">
      <h1>Company Profile</h1>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
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
    </Box>
  );
}

export default Company;
