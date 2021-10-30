import * as React from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import {
  selectSelectedMenu,
  selectNavigator,
} from "../features/navigator/navigatorSlice";
//import SelectOfflinemode from "./SelectOfflinemode";

const page001 =
  "1. インターネット等の通信ネットワーク及び電子技術を利用した各種情報処理サービスの提供\n\n" +
  "1. DX人材の育成、能力開発のための教育事業\n\n" +
  "1. 前各号に附帯又は関連する一切の事業";

const page002 =
  "弊社における電子公告の掲載先として登記した URL は " +
  "http://unremoted.com です。\n\n" +
  "以下の事項については電子公告として５年間掲載します。\n\n" +
  "- 定款変更の通知\n" +
  "- 組織再編等の通知\n" +
  "- 会社の合併\n" +
  "- 会社の分割\n" +
  "- 資本金の変更\n";

const page011 =
  "# 「認証」\n\n" +
  "すべての入り口であり、ここがバチッと決まっていないと" +
  "セキュリティや権限設定などがぐだぐだになってしまいます。\n\n" +
  "弊社のおすすめは認証機能を作り込まないこと。\n\n" +
  "デモでは Google認証 を体験いただけます。\n\n" +
  "本番サイトでは Google認証以外にも、以下のプロバイダから認証することが可能です。\n\n" +
  "- Apple\n" +
  "- Microsoft\n" +
  "- Yahoo!\n" +
  "- Facebook\n" +
  "- Github\n" +
  "- Twitter\n\n" +
  "プロバイダ認証以外にも、" +
  "メールアドレスとパスワードを用いたオーソドックスな認証方式を用いることも可能ですし、" +
  "これらを併用することも可能です。\n";

const page012 =
  "- Googleアカウントにログインした後に、本画面よりログインが可能です。\n\n" +
  "- ログイン後はディスプレイ名 (初期値は Googleユーザ名) の変更とドメイン名の指定が可能になります。\n\n" +
  "- ドメイン名の指定することによって、本番サイトでは同一ドメイン名のユーザ間で以下の情報共有を行えます。\n\n" +
  "  - 勤務表の提出、提出後の査閲、承認状況の確認\n\n" +
  "  - 資産、設備の利用状況の確認と設定\n\n";

const page110 = "https://ja.reactjs.org";

const page111 =
  "# React に出会えたのはとても幸運でした。\n\n" +
  "## Webフロントエンド開発フレームワーク比較\n\n" +
  "- 日本における求人数: (圧倒的に)React > Vue > Angular\n\n" +
  "- グローバルでのダウンロード数: (圧倒的に)React > Vue > Angular\n\n" +
  "- 学習コスト: Vue < React < Angular\n\n" +
  "## React でつくられていると思われるサイト\n\n" +
  "- Facebook\n\n" +
  "- AWSコンソール\n\n" +
  "- Trello\n\n" +
  "- Freee\n\n" +
  "- (なぜか) [Python ANACONDA](https://www.anaconda.com/)\n\n" +
  "- Qiita\n\n" +
  "- udemy\n\n";

const page120 = "https://www.typescriptlang.org/ja";

const page121 =
  "# Typescript に出会えたのはとても幸運でした。\n\n" +
  "使いはじめた頃は、開発スピードは遅くなるし、Web上のサンプルコードは少ないし、" +
  "エラーはよくわからないし、Warning を消すために呪文が必要になるしで、" +
  "導入したり辞めたりを繰り返していました。\n\n" +
  "でも気がつきました。\n\n" +
  "## Typescript で書かれたコードは品質が高いことに\n\n" +
  "そして\n\n" +
  "# VSCode 上でマウスをホバーすればなんとかなることに\n\n" +
  "(マイクロソフトさんのタッグに感謝！)";

const page130 = "https://redux.js.org";

const page131 =
  "# Redux Toolkit に出会えたのはとても幸運でした。\n\n" +
  "Redux Toolkit 以前は State と Context を使っていたのですが、" +
  "どうしても以下の問題が改善できませんでした。\n\n" +
  "- データの流れの見通しが悪くなってしまう\n\n" +
  "- 時間の経過とともにデータの流れを追い直すコストが発生してしまっている\n\n" +
  "# Redux Toolkit と Redux DevTools がすべてを解決してくれました。\n\n" +
  "アヤしい公告のようになってしまいましたが、これは事実です。";

const page140 = "https://firebase.google.cn";

const page141 =
  "# Firebase に出会えたのはとても幸運でした。\n\n" +
  "以前の開発スタイルでは以下の構成でバックエンドを構築していました。\n\n" +
  "- 開発環境: Dockerコンテナ\n\n" +
  "- デプロイ先: AWS AmazonLinux2 EC2インスタンス\n\n" +
  "- フレームワーク: Python + Django REST framework\n\n" +
  "- 認証: Simplejwt\n\n" +
  "- データベース: PostgreSQL\n\n" +
  "- ストレージ: AWS S3\n\n" +
  "- 負荷分散: AWS Application Load Balancer\n\n" +
  "- DNS: AWS Route53\n\n" +
  "- CDN: AWS Cloudfront\n\n" +
  "# 現在は DNS と CDN 以外のすべてを Firebase が受け持ってくれています。\n\n" +
  "本当に夢のような構成ですが、開発が少し落ち着いたらバックエンドのハイブリット化を検討しないといけませんね。\n\n" +
  "## Cloud Firestore によるオフライン時のユーザ体験の向上\n\n" +
  "Firebaseでは Realtime Database と Firestore Database を利用できます。\n\n" +
  "本デモサイトでは Firestore Database を採用しているのですが、Firestore では「オフラインモード」を" +
  "利用できます。\n\n" +
  "## Cloud Firestore のオフラインモードとは\n\n" +
  "以下は Cloud Firestore 公式からの引用です。\n\n" +
  "「Cloud Firestore は、オフライン データの永続性をサポートします。" +
  "この機能により、アプリが使用している Cloud Firestore データのコピーがキャッシュに保存されるため、" +
  "デバイスがオフラインの場合でも、アプリはデータにアクセスできます。" +
  "キャッシュされたデータに対しては書き込み、読み取り、リッスン、クエリを行うことができます。" +
  "デバイスがオンラインに戻ると、アプリがローカルで行った変更と Cloud Firestore バックエンドが同期されます。」" +
  "(2021年10月28日時点の記載)\n\n" +
  "オフラインモードの設定はデータベースに対して行われますので、ユーザごとに有効、無効を使い分けることはできません。\n\n" +
  "本デモサイトではユーザ情報に対するセキュリティの観点からオフラインモードを無効にしています。" +
  "(オフラインモードを有効にすると、オフライン中はユーザ情報がPCに蓄積されますので、そのリスクに関する注意喚起と、" +
  "ユーザ様の合意が必要になります)\n\n";

const page150 = "https://aws.amazon.com/jp/route53";

const page151 =
  "# Route53 に出会えたのはとても幸運でした。\n\n" +
  "Route53 のおかげで繰り返し起こる DNS のセキュリティ問題と乗っ取られる恐怖から" +
  "解放されました。\n\n" +
  "2017年 2月から利用を開始しましたが SLA はおそらく 100% でして、" +
  "月額で数百円の費用で運用できています。\n\n" +
  "ネットワークに詳しくないのであくまで「聞いた話」なのですが、" +
  "Route53 は DNS が 53ポートを用いて通信することからネーミングされたそうです。";

const page160 = "https://aws.amazon.com/jp/cloudfront";

const page161 =
  "# Cloudfront に出会えたのはとても幸運でした。\n\n" +
  "- SSL通信を終端してくれている\n\n" +
  "- AWS Certificate Manager が SSL/TLS証明書を自動更新してくれている\n\n" +
  "- S3 にデプロイした静的ページを低レイテンシーで配信してくれている\n\n" +
  "- (ユーザリクエストがとても少ないので) 月額ほぼゼロ円で運用できている\n\n" +
  "夢のようなサービスです。";

const page170 = "https://www.docker.com";

const page171 =
  "# Docker に出会えたのはとても幸運でした。\n\n" +
  "開発環境を Dockerコンテナ上に構築することにより、" +
  "OSSの最新バージョンへの挑戦が容易になり、" +
  "複数バージョンの併用や、元のバージョンに引き返すことも容易になりました。\n\n" +
  "コンテナは何度でも作り直せるので、環境構築に試行錯誤してしまったとしても、" +
  "クリーンな手順を確立するまで繰り返しトライすることができるので、" +
  "再現性のある環境構築が可能になりました。\n\n" +
  "Dockerコンテナは１プロセスに１コンテナを割り当てますので、" +
  "マイクロサービスによる分割統治を促進できるようにもなリました。";

const page180 = "https://kubernetes.io/ja";

const page181 = "# Firebase のおかげで今のところワークロードは不要です。";

const page190 = "https://www.ansible.com";

const page191 =
  "# 「アンシブルとは？」\n\n" +
  "「工学者が即時伝達装置のことをそう呼んでいるんですがね。" +
  "彼が言うには、時間物理学者が時間慣性方程式を立ててくれさえすれば、" +
  "そいつを制作し、テストし、その結果、理論の妥当性を偶発的に立証することができるだろう" +
  "ということです。それも何ヶ月とか何週間の間にね」\n\n" +
  "# 「われわれは互いに助け合う以外に救いはないことを知っています。" +
  "手を差し出さなければ誰も救ってくれないことを知っています。\n\n" +
  "あなたがたが差し出すその手は空です。わたしの手と同じように。" +
  "あなたがたはなにも持っていない。なにも所有していない。" +
  "自分の持ち物がないのです。あなたがたは自由なのだ。" +
  "あなたが持っている唯一のもの、それはありのままのあなたであり、" +
  "あなたがたはそれを与えるのです。」\n\n" +
  "(Source: 所有せざる人々)";

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
  if (
    selectedMenu.value === 11 &&
    navigator[selectedMenu.value].selectedTabValue === 0
  ) {
    markdown = page110;
  }
  if (
    selectedMenu.value === 11 &&
    navigator[selectedMenu.value].selectedTabValue === 1
  ) {
    markdown = page111;
  }
  if (
    selectedMenu.value === 12 &&
    navigator[selectedMenu.value].selectedTabValue === 0
  ) {
    markdown = page120;
  }
  if (
    selectedMenu.value === 12 &&
    navigator[selectedMenu.value].selectedTabValue === 1
  ) {
    markdown = page121;
  }
  if (
    selectedMenu.value === 13 &&
    navigator[selectedMenu.value].selectedTabValue === 0
  ) {
    markdown = page130;
  }
  if (
    selectedMenu.value === 13 &&
    navigator[selectedMenu.value].selectedTabValue === 1
  ) {
    markdown = page131;
  }
  if (
    selectedMenu.value === 14 &&
    navigator[selectedMenu.value].selectedTabValue === 0
  ) {
    markdown = page140;
  }
  if (
    selectedMenu.value === 14 &&
    navigator[selectedMenu.value].selectedTabValue === 1
  ) {
    markdown = page141;
  }
  if (
    selectedMenu.value === 15 &&
    navigator[selectedMenu.value].selectedTabValue === 0
  ) {
    markdown = page150;
  }
  if (
    selectedMenu.value === 15 &&
    navigator[selectedMenu.value].selectedTabValue === 1
  ) {
    markdown = page151;
  }
  if (
    selectedMenu.value === 16 &&
    navigator[selectedMenu.value].selectedTabValue === 0
  ) {
    markdown = page160;
  }
  if (
    selectedMenu.value === 16 &&
    navigator[selectedMenu.value].selectedTabValue === 1
  ) {
    markdown = page161;
  }
  if (
    selectedMenu.value === 17 &&
    navigator[selectedMenu.value].selectedTabValue === 0
  ) {
    markdown = page170;
  }
  if (
    selectedMenu.value === 17 &&
    navigator[selectedMenu.value].selectedTabValue === 1
  ) {
    markdown = page171;
  }
  if (
    selectedMenu.value === 18 &&
    navigator[selectedMenu.value].selectedTabValue === 0
  ) {
    markdown = page180;
  }
  if (
    selectedMenu.value === 18 &&
    navigator[selectedMenu.value].selectedTabValue === 1
  ) {
    markdown = page181;
  }
  if (
    selectedMenu.value === 19 &&
    navigator[selectedMenu.value].selectedTabValue === 0
  ) {
    markdown = page190;
  }
  if (
    selectedMenu.value === 19 &&
    navigator[selectedMenu.value].selectedTabValue === 1
  ) {
    markdown = page191;
  }
  return (
    <>
      <ReactMarkdown children={markdown} />
      {/* {selectedMenu.value === 14 &&
        navigator[selectedMenu.value].selectedTabValue === 1 && (
          <SelectOfflinemode />
        )} */}
    </>
  );
}
