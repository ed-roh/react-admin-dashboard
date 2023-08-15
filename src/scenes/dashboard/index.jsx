import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import { supabase } from "../../supabase";
import SimpleBackDrop from "../../components/SimpleBackDrop";
import { useState, useEffect } from "react";
import StatBox from "../../components/StatBox";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import PieChart from "../../components/PieChart";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="20"
            subtitle="Risks Unmitigated"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="10"
            subtitle="Policies Needing Review"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="4"
            subtitle="Meeting Notes Need Review"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="134"
            subtitle="Alerts Need Review"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* ROW 2 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            color="secondary"
            sx={{ padding: "10px 10px 0 10px" }}
          >
            Most Used Applications
          </Typography>
          <PieChart
            data={[
              { id: 1, value: 10, label: "Netflix" },
              { id: 2, value: 10, label: "Dropbox" },
              { id: 3, value: 10, label: "Office365" },
              { id: 4, value: 20, label: "OneDrive" },
              { id: 5, value: 50, label: "Other" },
            ]}
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            color="secondary"
            sx={{ padding: "10px 10px 0 10px" }}
          >
            Most Active Users
          </Typography>
          <PieChart
            data={[
              { id: 1, value: 50, label: "Eric Hester" },
              { id: 2, value: 20, label: "Michelle Gimmi" },
              { id: 3, value: 10, label: "Zachary Seiter" },
              { id: 4, value: 10, label: "Erik Rhine" },
            ]}
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            color="secondary"
            sx={{ padding: "10px 10px 0 10px" }}
          >
            Top 5 Event Types
          </Typography>
          <PieChart
            data={[
              { id: 1, value: 10, label: "Bad Login" },
              { id: 2, value: 10, label: "Blocked Website" },
              { id: 3, value: 10, label: "Phishing Link" },
              { id: 4, value: 10, label: "Unpatched System" },
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
