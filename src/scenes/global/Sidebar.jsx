import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';


const Item = ({ title, to, icon, selected, setSelected }) => {}
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: selected===title? "white" : colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <box style={{backgroundColor:"white"}}>
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          
          backgroundColor: 'white',

        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
          // backgroundColor:"white",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#3d85c6 !important",
        },
        "& .pro-menu-item.active": {
          color: "#3d85c6 !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[400],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <h3 style={{color:"#008000"}}>Hoping Minds</h3>
                <Typography variant="h3" color={colors.grey[100]}>
                 
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                <MenuOutlinedIcon
                    style={{
                      color: 'black',
                    }}
                  />
                  
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                  fontSize={'35px'}
                >
                  sagar bhati
                </Typography>
                <Typography variant="h5" color={colors.primary[500]} fontSize={'20px'}>
                  Full Stack Web Development
                </Typography>
              </Box>
            </Box>
          )}

<Box paddingLeft={isCollapsed ? undefined : "10%"}
style={{ color: 'white' }}>
  <Item
    title="Dashboard"
    to="/"
    icon={<HomeOutlinedIcon />}
    selected={selected}
    setSelected={setSelected}
  />

  <Item
    title="Analytics"
    to="/analytics"
    icon={<ReportGmailerrorredOutlinedIcon/>}
    selected={selected}
    setSelected={setSelected}
  />

  <Item
    title="Report"
    to="/report"
    icon={<AnalyticsOutlinedIcon />}
    selected={selected}
    setSelected={setSelected}
  />


          </Box>
        </Menu>
      </ProSidebar>
    </Box>
    </box>
  );
};

export default Sidebar;
