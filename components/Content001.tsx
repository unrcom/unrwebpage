import * as React from "react";
import ReactMarkdown from "react-markdown";
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

interface P {
  markdown: string;
}

const page001 =
  "1. インターネット等の通信ネットワーク及び電子技術を利用した各種情報処理サービスの提供\n\
  \n\
  1. DX人材の育成、能力開発のための教育事業\n\
  \n\
  1. 前各号に附帯又は関連する一切の事業";

const page002 =
  "弊社における電子公告の掲載先として登記した URL は [http://unremoted.com](http://unremoted.com) です。\n\
\n\
以下の事項については電子公告として５年間掲載します。\n\
\n\
- 定款変更の通知\n\
- 組織再編等の通知\n\
- 会社の合併\n\
- 会社の分割\n\
- 資本金の変更\n\
";

const page011 =
  "# 「認証」\n\
\n\
すべての入り口であり、ここがバチッと決まっていないとセキュリティや権限設定などがぐだぐだになってしまいます。\n\
\n\
弊社のおすすめは認証機能を作り込まないこと。\n\
\n\
デモでは Google認証 を体験いただけます。\n\
\n\
Google認証以外にも、以下のプロバイダから認証することが可能です。\n\
\n\
- Apple\n\
- Microsoft\n\
- Yahoo!\n\
- Facebook\n\
- Github\n\
- Twitter\n\
\n\
プロバイダ認証以外にも、\
メールアドレスとパスワードを用いたオーソドックスな認証方式を用いることも可能ですし、\
これらを併用することも可能です。\n\
";

const page012 =
  "- Googleアカウントにログインした後に、本画面よりログインが可能です。\n\n\
- ログイン後はディスプレイ名 (初期値は Googleユーザ名) の変更とドメイン名の指定が可能になります。\n\n\
- ドメイン名の指定することによって、同一ドメイン名のユーザ間では以下の情報共有を行えます。\n\n\
  - 勤務表の提出、提出後の査閲、承認状況\n\n\
  - 資産、設備の利用状況\n\n\
  - 資産、設備の利用予約\n\n\
- ドメイン名はメールアドレスの @ マーク以降のドメインを用いますが、任意の文字列を用いることも可能です。\n\n\
- 本デモサイトでは、新規で指定されたドメイン名の後にシステムがランダムに生成した８文字を付加した\
ドメイン名を利用していただきます。\n";

export default function Content001() {
  const selectedMenu = useSelector(selectSelectedMenu);
  const navigator = useSelector(selectNavigator);

  let markdown = "";

  if (
    selectedMenu.value === 0 &&
    navigator[selectedMenu.value].selectedTabValue === 1
  ) {
    markdown = page001;
  }
  if (
    selectedMenu.value === 0 &&
    navigator[selectedMenu.value].selectedTabValue === 2
  ) {
    markdown = page002;
  }
  if (
    selectedMenu.value === 1 &&
    navigator[selectedMenu.value].selectedTabValue === 1
  ) {
    markdown = page011;
  }
  if (
    selectedMenu.value === 1 &&
    navigator[selectedMenu.value].selectedTabValue === 2
  ) {
    markdown = page012;
  }

  return (
    <>
      <ReactMarkdown children={markdown} />
    </>
  );
}
