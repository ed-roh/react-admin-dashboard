import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import MenuOutlined from "@mui/icons-material/MenuOutlined";
import KeyboardDoubleArrowLeft from "@mui/icons-material/KeyboardDoubleArrowLeft";
import ListAltOutlined from "@mui/icons-material/ListAltOutlined";
import EventOutlined from '@mui/icons-material/EventOutlined';
import SchoolOutlined from "@mui/icons-material/SchoolOutlined";
import { TerminalOutlined } from "@mui/icons-material";
import { DevicesOutlined } from "@mui/icons-material";
import ReceiptOutlined from "@mui/icons-material/ReceiptOutlined";
import PeopleOutlined from "@mui/icons-material/PeopleOutlined";
import SourceOutlined from '@mui/icons-material/SourceOutlined';
import ApartmentOutlined from '@mui/icons-material/ApartmentOutlined';
import MoneyOutlined from '@mui/icons-material/MoneyOutlined';
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import AttachMoneyOutlined from '@mui/icons-material/AttachMoneyOutlined';
import CloudSyncOutlined from '@mui/icons-material/CloudSyncOutlined';
import VerifiedUserOutlined from '@mui/icons-material/VerifiedUserOutlined';
import { useUser } from "@supabase/auth-helpers-react";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({userInfo, isSidebar}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const user = useUser();

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlined /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="5px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Clearisk Portal
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <KeyboardDoubleArrowLeft />
                </IconButton>
              </Box>
            )}
          </MenuItem>

            {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.jpg`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {/* {userInfo.full_name}  */}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {/* {userInfo.title} */}
                </Typography>
              </Box>
            </Box>
          )} 

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlined />}
              selected={selected}
              setSelected={setSelected}
            />

             <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              GRC
            </Typography>
            <Item
              title="Risk Scorecard"
              to="/scorecard"
              icon={<MoneyOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Assessments"
              to="/assessments"
              icon={<VerifiedUserOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Risk Register"
              to="/riskregister"
              icon={<ListAltOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
            title="Policy and Procedure"
            to="/policyandprocedure"
            icon={<SourceOutlined />}
            selected={selected}
            setSelected={setSelected}
          />
            <Item
              title="Meetings"
              to="/meetings"
              icon={<EventOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
           <Item
              title="Focus Groups"
              to="/focusgroups"
              icon={<PeopleOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Training"
              to="/training"
              icon={<SchoolOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Company"
              to="/company"
              icon={<ApartmentOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="People"
              to="/people"
              icon={<PeopleOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Vendors"
              to="/vendors"
              icon={<ReceiptOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Hardware"
              to="/hardware"
              icon={<DevicesOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Software"
              to="/hardware"
              icon={<TerminalOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
           <Item
              title="Document Library"
              to="/documents"
              icon={<SourceOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Admin
            </Typography>
            <Item
              title="Settings"
              to="/settings"
              icon={<SettingsOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Billing"
              to="/billing"
              icon={<AttachMoneyOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Probes"
              to="/probes"
              icon={<CloudSyncOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
