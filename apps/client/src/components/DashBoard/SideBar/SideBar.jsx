import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MdChevronLeft,
  MdApartment,
  MdWrongLocation,
  MdLeaderboard,
  MdAdminPanelSettings,
  MdSubscriptions,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { CiLogin } from "react-icons/ci";
import { FaBox } from "react-icons/fa";
import env_variables from "../../../config/envconfig";
const navItems = [
  {
    text: "Resident",
    icon: null,
    role: false,
  },
  {
    text: "My Apartments",
    icon: <MdApartment />,
    path: "/dash",
    role: false,
  },
  {
    text: "Complaints",
    icon: <MdWrongLocation />,
    path: "/dash/complaints",
    role: false,
  },
  {
    text: "Owner",
    icon: null,
    role: false,
  },
  {
    text: "Own Apartments",
    icon: <MdLeaderboard />,
    path: "/dash/owningapartments",
    role: false,
  },
  {
    text: "Subsciptions",
    icon: <MdSubscriptions />,
    path: "/dash/subscriptions",
    role: false,
  },
  {
    text: "Security",
    icon: null,
    role: false,
  },
  {
    text: "Add Log",
    icon: <CiLogin />,
    path: "/dash/logs",
    role: false,
  },
  {
    text: "Add Parcel",
    icon: <FaBox />,
    path: "/dash/parcels",
    role: false,
  },
  {
    text: "Admin",
    icon: null,
    role: true,
  },
  {
    text: "Apartments",
    icon: <MdAdminPanelSettings />,
    path: "/dash/admin/apartments",
    role: true,
  },
];

const SideBar = ({ drawerWidth }) => {
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const { pathname } = useLocation();
  const theme = useTheme();
  const { email } = useSelector((state) => state.user.userDetails);
    console.log(email,env_variables.ADMIN_PASS);
  const location = useLocation();
  useEffect(() => {
    setActive(pathname);
  }, [pathname]);

  return (
    <Box
      sx={{
        width: drawerWidth,
        height: "100%",
        flexShrink: 0,
        borderRight: "0.8px solid gray",
        position: "fixed",
        zIndex: 1000,
        overflowY: "auto",
        boxShadow:
          "0 4px 8px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.06)", // Neat shadow
      }}
    >
      <Box
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            color: theme.palette.text.primary,
          },
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Drawer Items */}
        <List>
          {navItems.map(({ text, icon, path, role }) => {
            if (email != env_variables.ADMIN_PASS && role) {
              return null;
            }
            if (!icon) {
              return (
                <Typography key={text} sx={{ m: "2.25rem 0 0rem 3rem" }}>
                  {text}
                </Typography>
              );
            }
            const lcText = text.toLowerCase();

            return (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(path);
                    setActive(lcText);
                  }}
                  sx={{
                    backgroundColor:
                      location.pathname === path
                        ? theme.palette.secondary[300]
                        : "transparent",
                    color:
                      location.pathname === path
                        ? theme.palette.primary[600]
                        : theme.palette.secondary[100],
                  }}
                >
                  <ListItemIcon
                    sx={{
                      ml: "2rem",
                      color: "#00f",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    sx={{
                      textWrap: "nowrap",
                    }}
                  />
                  {active === lcText && <MdChevronLeft sx={{ ml: "auto" }} />}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );
};

export default SideBar;
