import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function Content() {
  return (
    <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden" }}>
      <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="left">
        商号: アンリモート合同会社
      </Typography>
      <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="left">
        英字: Unremote LLC
      </Typography>
      <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="left">
        ドメイン名: unremoted.com
      </Typography>
      <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="left">
        設立日: 2021年 4月 13日
      </Typography>
      <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="left">
        法人番号: 8-0111-0301-0605
      </Typography>
      <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="left">
        資本金: 300万円
      </Typography>
      <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="left">
        主要取引金融機関: 東京三協信用金庫　新宿支店
      </Typography>
    </Paper>
  );
}
