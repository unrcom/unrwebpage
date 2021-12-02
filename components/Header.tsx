import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  tabMod,
  mod,
  selectSelectedMenu,
  selectNavigator,
} from "../features/navigator/navigatorSlice";
import { selectUser } from "../features/auth/authSlice";

import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import HomeIcon from "@mui/icons-material/Home";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
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
// import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import DomainIcon from "@mui/icons-material/Domain";
import ListIcon from "@mui/icons-material/List";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";

interface HeaderProps {
  onDrawerToggle: () => void;
}

export default function Header(props: HeaderProps) {
  const { onDrawerToggle } = props;
  const navigator = useSelector(selectNavigator);
  const selectedMenu = useSelector(selectSelectedMenu);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const icons = [
    <HomeIcon />,
    <DnsIcon />,
    <DnsIcon />,
    <DnsIcon />,
    <DnsIcon />,
    <DnsIcon />,
    <DnsIcon />,
    <DnsIcon />,
    <DnsIcon />,
    <DnsIcon />,
    <FingerprintIcon />,
    <AutoGraphIcon />,
    <AutoGraphIcon />,
    <AlignHorizontalLeftIcon />,
    <AttachMoneyIcon />,
    <AutoGraphIcon />,
    <ListIcon />,
    <DnsIcon />,
    <DnsIcon />,
    <MailOutlineIcon />,
    <SpaIcon />,
    <SettingsInputCompositeIcon />,
    <AutoAwesomeMotionIcon />,
    <FireplaceIcon />,
    <DnsIcon />,
    <CloudDownloadIcon />,
    <AppsIcon />,
    <AnchorIcon />,
    <AddToDriveIcon />,
    <DnsIcon />,
  ];

  const returnDisplayname = () => {
    if (user.uid) {
      if (user.displayName) {
        return <h4>{user.displayName}</h4>;
      } else {
        return <h4>{user.providerDisplayName}</h4>;
      }
    }
  };
  const returnAvatar = () => {
    if (user.uid) {
      if (user.photoUrl) {
        return (
          <Avatar
            // className={classes.avatar}
            alt="avatar"
            src={user.photoUrl}
          />
        );
      }
    }
  };

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={1}>
              <Grid sx={{ display: { sm: "none", xs: "block" } }} item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={onDrawerToggle}
                  edge="start"
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Grid item xs={8}></Grid>
            <Grid item xs={2} textAlign="right">
              {returnDisplayname()}
            </Grid>
            <Grid item xs={1}>
              {returnAvatar()}
            </Grid>
            <Grid item xs />
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs={1}>
              {icons[selectedMenu.value]}
            </Grid>
            <Grid item xs={8}>
              <Typography color="inherit" variant="h5" component="h1">
                {navigator[selectedMenu.value].title}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="outlined"
              startIcon={<MailOutlineIcon />}
              color="inherit"
              size="small"
              onClick={() => dispatch(mod(2))}
            >
              お問い合わせ
            </Button>{" "}
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Tabs
          value={navigator[selectedMenu.value].selectedTabValue}
          textColor="inherit"
        >
          {navigator[selectedMenu.value].tabCnt > 0 && (
            <Tab
              onClick={() => dispatch(tabMod(0))}
              label={navigator[selectedMenu.value].tab[0].title}
            />
          )}
          {navigator[selectedMenu.value].tabCnt > 1 && (
            <Tab
              onClick={() => dispatch(tabMod(1))}
              label={navigator[selectedMenu.value].tab[1].title}
            />
          )}
          {navigator[selectedMenu.value].tabCnt > 2 && (
            <Tab
              onClick={() => dispatch(tabMod(2))}
              label={navigator[selectedMenu.value].tab[2].title}
            />
          )}
          {navigator[selectedMenu.value].tabCnt > 3 && (
            <Tab
              onClick={() => dispatch(tabMod(3))}
              label={navigator[selectedMenu.value].tab[3].title}
            />
          )}
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
}
