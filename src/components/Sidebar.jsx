import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ApartmentOutlined,
  DevicesOutlined,
  EventOutlined,
  ListAltOutlined,
  MoneyOutlined,
  PeopleOutlined,
  ReceiptOutlined,
  SchoolOutlined,
  SourceOutlined,
  VerifiedUserOutlined,
  TerminalOutlined,
  HomeOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  SettingsOutlined,
  AttachMoneyOutlined,
  CloudSyncOutlined,
  AccountCircle,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import { useUser } from "@supabase/auth-helpers-react";
import { tokens } from "../theme";
import ScoreBox from "./ScoreBox";

const navItems = [
  {
    text: "Dashboard",
    path: "",
    icon: <HomeOutlined />,
  },
  {
    text: "GRC",
    icon: null,
  },
  {
    text: "Risk Scorecard",
    path: "riskscorecard",
    icon: <MoneyOutlined />,
  },
  {
    text: "Assessments",
    path: "assessments",
    icon: <VerifiedUserOutlined />,
  },
  {
    text: "Risk Register",
    path: "riskregister",
    icon: <ListAltOutlined />,
  },
  {
    text: "Policy / Procedure",
    path: "policyandprocedure",
    icon: <SourceOutlined />,
  },
  {
    text: "Meetings",
    path: "meetings",
    icon: <EventOutlined />,
  },
  {
    text: "Training",
    path: "training",
    icon: <SchoolOutlined />,
  },
  {
    text: "Data",
    icon: null,
  },
  {
    text: "Company",
    path: "company",
    icon: <ApartmentOutlined />,
  },
  {
    text: "People",
    path: "people",
    icon: <PeopleOutlined />,
  },
  {
    text: "Vendors",
    path: "vendors",
    icon: <ReceiptOutlined />,
  },
  {
    text: "Hardware",
    path: "hardware",
    icon: <DevicesOutlined />,
  },
  {
    text: "Software",
    path: "software",
    icon: <TerminalOutlined />,
  },
  {
    text: "Document Library",
    path: "documentlibrary",
    icon: <SourceOutlined />,
  },
  {
    text: "Admin",
    icon: null,
  },
  {
    text: "Settings",
    path: "settings",
    icon: <SettingsOutlined />,
  },
  {
    text: "Billing",
    path: "billing",
    icon: <AttachMoneyOutlined />,
  },
  {
    text: "Probes",
    path: "probes",
    icon: <CloudSyncOutlined />,
  },
];

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const user = useUser();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  useEffect(() => {
    setIsSidebarOpen(isNonMobile);
  }, [isNonMobile]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="0px"
                ></Box>
                <Box>
                  <Typography variant="h4" color={colors.grey[100]}>
                    CleaRisk&reg; Portal
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              <ScoreBox score={0} />
            </Box>
            <List>
              {navItems.map(({ text, path, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate("/" + path);
                        setActive(path);
                      }}
                      sx={{
                        backgroundColor:
                          active === path
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === path
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === path
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === path && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box position="absolute" bottom="2rem">
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.full_name}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.title}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "25px ",
                }}
              />
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
