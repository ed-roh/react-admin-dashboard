import { useState } from "react";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../theme";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import MenuOutlined from "@mui/icons-material/MenuOutlined";
import KeyboardDoubleArrowLeft from "@mui/icons-material/KeyboardDoubleArrowLeft";
import ListAltOutlined from "@mui/icons-material/ListAltOutlined";
import EventOutlined from "@mui/icons-material/EventOutlined";
import SchoolOutlined from "@mui/icons-material/SchoolOutlined";
import { TerminalOutlined } from "@mui/icons-material";
import { DevicesOutlined } from "@mui/icons-material";
import ReceiptOutlined from "@mui/icons-material/ReceiptOutlined";
import PeopleOutlined from "@mui/icons-material/PeopleOutlined";
import SourceOutlined from "@mui/icons-material/SourceOutlined";
import ApartmentOutlined from "@mui/icons-material/ApartmentOutlined";
import MoneyOutlined from "@mui/icons-material/MoneyOutlined";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import AttachMoneyOutlined from "@mui/icons-material/AttachMoneyOutlined";
import CloudSyncOutlined from "@mui/icons-material/CloudSyncOutlined";
import VerifiedUserOutlined from "@mui/icons-material/VerifiedUserOutlined";
import { useUser } from "@supabase/auth-helpers-react";
import ScoreBox from "./ScoreBox";

const Sidebar = ({ userInfo, isSidebar }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const user = useUser();

  const navigate = useNavigate();

  const handleClick = (title, to) => {
    setSelected(title);
    navigate(to);
  };

  const Item = ({ title, to, icon, selected, setSelected }) => {
    return (
      <MenuItem
        active={selected === title}
        onClick={() => {
          handleClick(title, to);
        }}
        icon={icon}
      >
        <Typography>{title}</Typography>
      </MenuItem>
    );
  };

  return (
    <Box
      sx={{
        "& .ps-sidebar-container": {
          background: "transparent !important",
        },
        "& .ps-menu-icon": {
          backgroundColor: "transparent !important",
        },
        "& .ps-menuitem-root": {
          color: colors.primary.main,
          padding: "0px 0px 0px 0px !important",
        },
        "& .ps-menuitem-root:hover": {
          color: colors.greenAccent[500],
         },
        "& .ps-active": {
          color: colors.blueAccent[400],
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlined /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="0px"
                >
                  <Typography variant="h5" color={colors.grey[100]}>
                    KnowByte Solutions
                  </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <KeyboardDoubleArrowLeft />
                  </IconButton>
                </Box>
                <Box>
                  <Typography variant="h3" color={colors.grey[100]}>
                    CleaRisk&reg; Portal
                  </Typography>
                </Box>
              </>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <ScoreBox score={25} />
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

          <Box>
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
              to="/software"
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
