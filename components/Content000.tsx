import * as React from "react";
import { useSelector } from "react-redux";
import {
  selectSelectedMenu,
  selectNavigator,
} from "../features/navigator/navigatorSlice";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

function createData(itemname: string, value: string) {
  return { itemname, value };
}

const rows000 = [
  createData("商号", "アンリモート合同会社"),
  createData("英字", "Unremote LLC"),
  createData("ドメイン", "unremoted.com"),
  createData(
    "住所",
    "東京都新宿区新宿５−１１−３０　新宿第五葉山ビル３０８号室"
  ),
  createData("設立日", "2021年 4月 13日"),
  createData("法人番号", "8-0111-0301-0605"),
  createData("資本金", "300万円"),
  createData("主要取引金融機関", "東京三協信用金庫　新宿支店"),
];

const rows003 = [
  createData("決算月", "３月"),
  createData("請求書払い", "月末締め翌月末日までの現金支払いを標準とします"),
  createData(
    "弊社からのご請求書",
    "月末締め翌月末日までの現金によるお支払いを希望します"
  ),
  createData("給与、報酬", "月末締め翌月25日までの現金支払いを標準とします"),
  createData("源泉所得税の納付", "特例により７月１０日と１月２０日にて行う"),
  createData("法人税、消費税、事業税、都民税の申告と納付", "５月"),
];

const rows100 = [
  createData("メール", "info@unremoted.com"),
  createData(
    "対面でのお問い合わせ",
    "上記のメールアドレスにご要件をお送りください。" +
      "折り返しブラウザから接続可能なオンライン会議用のURL (Google Meet) を返信いたします。"
  ),
  createData("Facebook メッセンジャー", "https://m.me/unremoted"),
  createData("Twitter", "@unrcom"),
];

let rows = rows000;

export default function Content000() {
  const selectedMenu = useSelector(selectSelectedMenu);
  const navigator = useSelector(selectNavigator);

  if (
    selectedMenu.value === 1 &&
    navigator[selectedMenu.value].selectedTabValue === 0
  ) {
    rows = rows000;
  }

  if (
    selectedMenu.value === 1 &&
    navigator[selectedMenu.value].selectedTabValue === 3
  ) {
    rows = rows003;
  }

  if (selectedMenu.value === 2) {
    rows = rows100;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.itemname}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Typography
                  sx={{ my: 2, mx: 2 }}
                  color="text.primary"
                  align="left"
                >
                  {row.itemname}
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography
                  sx={{ my: 2, mx: 2 }}
                  color="text.primary"
                  align="left"
                >
                  {row.value}{" "}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
