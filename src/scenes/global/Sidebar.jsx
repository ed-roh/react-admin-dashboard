import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ReportGmailerrorredOutlinedIcon from "@mui/icons-material/ReportGmailerrorredOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      style={{ color: "rgb(120, 144, 156)" }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const location = useLocation();

  const isMobile = useMediaQuery("(max-width: 960px)");

  useEffect(() => {
    setIsCollapsed(isMobile);
  }, [isMobile]);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setSelected("Dashboard");
    } else if (path === "/analytics") {
      setSelected("Analytics");
    } else if (path === "/report") {
      setSelected("Report");
    }
  }, [location]);

  return (
    <Box style={{ backgroundColor: "white" }}>
      <Box
        sx={{
          "& .pro-sidebar-inner": {
            backgroundColor: "white",
          },
          "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
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
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 0 20px 0",
                color: "rgb(120, 144, 156)",
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <h3
                    style={{
                      backgroundImage: "linear-gradient( #008000, #00FF00)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Hoping Minds
                  </h3>

                  <Typography variant="h3"></Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon
                      style={{
                        color: "black",
                      }}
                    />
                  </IconButton>
                </Box>
              )}
            </MenuItem>

            {!isCollapsed && (
              <Box mb="25px">
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                ></Box>
                <Box textAlign="center">
                  <Typography
                    variant="h2"
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                    fontSize={"30px"}
                    style={{ color: "rgb(120, 144, 156)" }}
                  >
                    Avinash
                  </Typography>
                  <Typography
                    variant="h5"
                    fontSize={"19px"}
                    style={{ color: "rgb(120, 144, 156)" }}
                  >
                    FSD
                  </Typography>
                </Box>
              </Box>
            )}

            <Box
              paddingLeft={isCollapsed ? undefined : "10%"}
              style={{ color: "white" }}
            >
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
                icon={<ReportGmailerrorredOutlinedIcon />}
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
    </Box>
  );
};

export default Sidebar;
