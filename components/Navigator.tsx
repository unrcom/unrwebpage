import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { mod, selectNavigator } from "../features/navigator/navigatorSlice";

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
import SpaIcon from "@mui/icons-material/Spa";
import SettingsInputCompositeIcon from "@mui/icons-material/SettingsInputComposite";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import FireplaceIcon from "@mui/icons-material/Fireplace";
import AppsIcon from "@mui/icons-material/Apps";
import DnsIcon from "@mui/icons-material/Dns";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import AnchorIcon from "@mui/icons-material/Anchor";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DomainIcon from "@mui/icons-material/Domain";
import ListIcon from "@mui/icons-material/List";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";

import Logo from "./images/unnamed.jpg";

const categories = [
  {
    id: "デモサイト",
    children: [
      { id: "認証", icon: <FingerprintIcon />, active: false, idx: 10 },
      { id: "投票", icon: <AlignHorizontalLeftIcon />, active: false, idx: 11 },
      { id: "予約", icon: <DomainIcon />, active: false, idx: 12 },
      { id: "勤務", icon: <AssignmentIndIcon />, active: false, idx: 13 },
      { id: "原価", icon: <AttachMoneyIcon />, active: false, idx: 14 },
      { id: "販売", icon: <AutoGraphIcon />, active: false, idx: 15 },
      { id: "履歴", icon: <ListIcon />, active: false, idx: 16 },
    ],
  },
  {
    id: "技術要素",
    children: [
      { id: "React", icon: <SpaIcon />, active: false, idx: 20 },
      {
        id: "TypeScript",
        icon: <SettingsInputCompositeIcon />,
        active: false,
        idx: 21,
      },
      { id: "Redux", icon: <AutoAwesomeMotionIcon />, active: false, idx: 22 },
      { id: "Firebase", icon: <FireplaceIcon />, active: false, idx: 23 },
      { id: "AWS Route53", icon: <DnsIcon />, active: false, idx: 24 },
      {
        id: "AWS Cloudfront",
        icon: <CloudDownloadIcon />,
        active: false,
        idx: 25,
      },
      { id: "Docker", icon: <AppsIcon />, active: false, idx: 26 },
      { id: "Kubernetes", icon: <AnchorIcon />, active: false, idx: 27 },
      { id: "Ansible", icon: <AddToDriveIcon />, active: false, idx: 28 },
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

export default function Navigator(props: any) {
  const { ...other } = props;
  const navigator = useSelector(selectNavigator);
  const dispatch = useDispatch();

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          sx={{ ...item, ...itemCategory, fontSize: 22, color: "#fff" }}
        >
          <ListItemButton
            selected={navigator[0].selected}
            sx={item}
            onClick={() => dispatch(mod(0))}
          >
            <ListItemIcon>
              <img src={Logo} width="193" alt="logo" />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        <ListItem
          sx={{ ...item, ...itemCategory, fontSize: 22, color: "#fff" }}
        >
          <ListItemButton
            selected={navigator[0].selected}
            sx={item}
            onClick={() => dispatch(mod(0))}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>
              <h4>unremoted.com</h4>
            </ListItemText>
          </ListItemButton>
        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: "#101F33" }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: "#fff" }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, idx }) => (
              <ListItem disablePadding key={childId}>
                <ListItemButton
                  selected={navigator[idx].selected}
                  sx={item}
                  onClick={() => dispatch(mod(idx))}
                >
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
