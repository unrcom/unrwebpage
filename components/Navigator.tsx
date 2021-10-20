import * as React from "react";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import PeopleIcon from "@mui/icons-material/People";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import PermMediaOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActual";
import PublicIcon from "@mui/icons-material/Public";
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernet";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import TimerIcon from "@mui/icons-material/Timer";
import SettingsIcon from "@mui/icons-material/Settings";
import PhonelinkSetupIcon from "@mui/icons-material/PhonelinkSetup";
import SpaIcon from "@mui/icons-material/Spa";
import SettingsInputCompositeIcon from "@mui/icons-material/SettingsInputComposite";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import FireplaceIcon from "@mui/icons-material/Fireplace";
import ViewComfyIcon from "@mui/icons-material/ViewComfy";
import FavoriteIcon from "@mui/icons-material/Favorite";

const categories = [
  {
    id: "製品",
    children: [
      {
        id: "認証",
        icon: <FingerprintIcon />,
        active: true,
      },
      { id: "履歴", icon: <FavoriteIcon /> },
      { id: "販売", icon: <FavoriteIcon /> },
      {
        id: "資産",
        icon: <FavoriteIcon />,
      },
      { id: "勤務", icon: <FavoriteIcon /> },
      { id: "原価", icon: <FavoriteIcon /> },
    ],
  },
  {
    id: "技術要素",
    children: [
      { id: "React", icon: <SpaIcon /> },
      { id: "TyprScript", icon: <SettingsInputCompositeIcon /> },
      { id: "Redux", icon: <AutoAwesomeMotionIcon /> },
      { id: "Firebase", icon: <FireplaceIcon /> },
      { id: "AWS Route53", icon: <FavoriteIcon /> },
      { id: "Docker", icon: <ViewComfyIcon /> },
      { id: "Kubernetes", icon: <FavoriteIcon /> },
      { id: "Ansible", icon: <FavoriteIcon /> },
    ],
  },
];

const item = {
  py: "2px",
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

const itemCategory = {
  boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
  py: 1.5,
  px: 3,
};

export default function Navigator(props) {
  const { ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          sx={{ ...item, ...itemCategory, fontSize: 22, color: "#fff" }}
        >
          unremoted.com
        </ListItem>
        <ListItem sx={{ ...item, ...itemCategory }}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>会社概要</ListItemText>
        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: "#101F33" }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: "#fff" }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active }) => (
              <ListItem disablePadding key={childId}>
                <ListItemButton selected={active} sx={item}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}

            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}
