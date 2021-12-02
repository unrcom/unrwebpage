import * as React from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import {
  selectSelectedMenu,
  selectNavigator,
} from "../features/navigator/navigatorSlice";

const page000 =
  "# Unremote が提供するデモサイトへようこそ！\n\n" +
  " 本サイトでは SPA (Single Page Application) を体験できます。\n\n" +
  "## SPA ではない一般的なアプリケーション\n\n" +
  " インターネット上の Webページでは「リンク」をクリックすることにより目的のページを訪ねることができます。これはハイパーリンクと呼ばれている World Wide Web の仕組みによって実現されています。\n\n" +
  " ここではおなじみの「あの」ユーザ体験が繰り返されています。\n\n" +
  "- ユーザはブラウザ上のテキスト、画像、アイコンなどの「リンク」をクリックすることにより、目的のインターネットアドレスとパラメータ (URLと呼ばれているもの) を指定しています\n" +
  "- ブラウザは目的の情報配信サーバへリソースを取得するための「リクエスト」を送出します\n" +
  "- 目的の情報配信サーバは、リクエストを受け付けると、要求されたリソースをレスポンス (返却) します\n" +
  "  - そのためユーザはこのレスポンスの到着を待つことになリます\n" +
  "- ブラウザはレスポンスに含まれるリソースから画面を再描画しますが、これは通常、画面の再読み込み (リロード) をともないます。\n\n" +
  " インターネット上のユーザ体験は「リクエストしてレスポンスと画面再描画を待つ」という作業を「ギッコン、バッタン」繰り返すものになってしまいます。\n" +
  "## SPA とは？\n\n" +
  " ユーザ操作に応じて必要なデータをあらかじめ読み込んだ状態でアプリが動作しています。そのため目的サーバに「リクエスト」して「レスポンス」を待つというおなじみのパターンから解放されます。\n\n" +
  " ぜひ本サイトのデモで SPA を体験してみてください。\n\n" +
  "- 認証\n" +
  "  - ログインすることにより、さまざまな Webアプリを体験していただけます\n" +
  "  - ログインすると画面の右上に、認証プロバイダから連携されたユーザ名とアバター画像を表示します\n" +
  "  - このユーザ名は自由に変更することが可能です\n\n" +
  "- 投票\n" +
  "  - さまざまなアンケートをカジュアルに作成できるサービスを開発していたのですが、Googleフォームの存在を知り、本サービスの公開は挫折しました。\n\n" +
  "  - SPA の開発経験を積み上げられましたので、これはこれでヨシとしています。\n\n" +
  "- ３目並べ\n" +
  "  - 有名な [React公式チュートリアル](https://ja.reactjs.org/tutorial/tutorial.html) で紹介されている「３目並べ」ゲームを、React Functional Component + Redux Toolkit + TypeScript + Firebase で再構築しました。\n\n" +
  "  - ログインしなくても利用できますのでお試しください。\n\n" +
  "- ３目並べオンライン\n" +
  "  - ３目並べのオンライン対戦を体験できます。\n\n" +
  "  - 今のところモックレベルのページを公開しています。\n\n" +
  "- Covid19ライブ\n" +
  "  - 国別の時系列データとグローバルの時系列データを公開できるように準備を進めています。\n\n" +
  "";

const page011 =
  "1. インターネット等の通信ネットワーク及び電子技術を利用した各種情報処理サービスの提供\n\n" +
  "1. DX人材の育成、能力開発のための教育事業\n\n" +
  "1. 前各号に附帯又は関連する一切の事業";

const page012 =
  "弊社における電子公告の掲載先として登記した URL は " +
  "http://unremoted.com です。\n\n" +
  "以下の事項については電子公告として５年間掲載します。\n\n" +
  "- 定款変更の通知\n" +
  "- 組織再編等の通知\n" +
  "- 会社の合併\n" +
  "- 会社の分割\n" +
  "- 資本金の変更\n";

const page101 =
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

const page102 =
  "- Googleアカウントにログインした後に、本画面よりログインが可能です。\n\n" +
  "- ログイン後はディスプレイ名 (初期値は Googleユーザ名) の変更が可能になります。\n\n" +
  "";
// "- ログイン後はディスプレイ名 (初期値は Googleユーザ名) の変更とドメイン名の指定が可能になります。\n\n" +
// "- ドメイン名の指定することによって、本番サイトでは同一ドメイン名のユーザ間で以下の情報共有を行えます。\n\n" +
// "  - 勤務表の提出、提出後の査閲、承認状況の確認\n\n" +
// "  - 資産、設備の利用状況の確認と設定\n\n";

const page111 =
  "- [React公式チュートリアル](https://ja.reactjs.org/tutorial/tutorial.html) で体験できる、あの有名な「３目並べ」ゲームです。\n\n" +
  "- 本家サイトではクラスコンポーネントを使っていますが、本サイトでは関数コンポーネントで再構築しています。\n\n";

const page112 =
  '- 先手は "X" からです。順番に遊んでください。\n\n' +
  "- [Go to game start] ボタンを押すと、最初からゲームをやり直せます。\n\n" +
  "- [Go to move xx] ボタンを押すと、そこまで手番を戻してゲームをやり直せます。";

const page200 = "https://ja.reactjs.org";

const page201 =
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

const page210 = "https://www.typescriptlang.org/ja";

const page211 =
  "# Typescript に出会えたのはとても幸運でした。\n\n" +
  "## Typescript でコードを書くと、コーディングアップ時の品質がとても高くなります。\n\n" +
  "そして\n\n" +
  "## コーディング中にわけがわからなくなっても VSCode 上でマウスをホバーすればどうにかなります！\n\n" +
  "";

const page220 = "https://redux.js.org";

const page221 =
  "# Redux Toolkit に出会えたのはとても幸運でした。\n\n" +
  "Redux Toolkit 以前は State と Context を使っていたのですが、" +
  "どうしても以下の問題が改善できませんでした。\n\n" +
  "- データの流れの見通しが悪くなってしまう\n\n" +
  "- 時間の経過とともにデータの流れを追い直すコストが発生してしまっている\n\n" +
  "# Redux Toolkit と Redux DevTools がすべてを解決してくれました。\n\n" +
  "アヤしい公告のようになってしまいましたが、これは事実です。";

const page230 = "https://firebase.google.cn";

const page231 =
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
  "";

const page240 = "https://aws.amazon.com/jp/route53";

const page241 =
  "# Route53 に出会えたのはとても幸運でした。\n\n" +
  "Route53 のおかげで繰り返し起こる DNS のセキュリティ問題と乗っ取られる恐怖から" +
  "解放されました。\n\n" +
  "2017年 2月から利用を開始しましたが SLA はおそらく 100% でして、" +
  "１ドメイン当たり月額 0.5 から 0.6 USD の費用で運用できています。\n\n" +
  "ドメイン維持には .com の場合年額 1.2 USD かかリます。\n";

const page250 = "https://aws.amazon.com/jp/cloudfront";

const page251 =
  "# Cloudfront に出会えたのはとても幸運でした。\n\n" +
  "- SSL通信を終端してくれている\n\n" +
  "- AWS Certificate Manager が SSL/TLS証明書を自動更新してくれている\n\n" +
  "- S3 にデプロイした静的ページを低レイテンシーで配信してくれている\n\n" +
  "- (ユーザリクエストがとても少ないので) 月額ほぼゼロ円で運用できている\n\n" +
  "夢のようなサービスです。";

const page260 = "https://www.docker.com";

const page261 =
  "# Docker に出会えたのはとても幸運でした。\n\n" +
  "開発環境を Dockerコンテナ上に構築することにより、" +
  "OSSの最新バージョンへの挑戦が容易になり、" +
  "複数バージョンの併用や、元のバージョンに引き返すことも容易になりました。\n\n" +
  "コンテナは何度でも作り直せるので、環境構築に試行錯誤してしまったとしても、" +
  "クリーンな構築手順を確立するまで繰り返しトライすることができるので、" +
  "再現性のある環境構築が可能になりました。\n\n" +
  "Dockerコンテナは１プロセスに１コンテナを割り当てますので、" +
  "マイクロサービスによる分割統治を促進できるようにもなリました。";

const page270 = "https://kubernetes.io/ja";

const page271 = "# Firebase のおかげで今のところワークロードは不要です。";

const page280 = "https://www.ansible.com";

const page281 =
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

  if (selectedMenu.value === 0) {
    markdown = page000;
  }
  if (
    selectedMenu.value === 1 &&
    navigator[selectedMenu.value].selectedTabValue === 2
  ) {
    markdown = page012;
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
    selectedMenu.value === 10 &&
    navigator[selectedMenu.value].selectedTabValue === 1
  ) {
    markdown = page101;
  }
  if (
    selectedMenu.value === 10 &&
    navigator[selectedMenu.value].selectedTabValue === 2
  ) {
    markdown = page102;
  }
  if (
    selectedMenu.value === 11 &&
    navigator[selectedMenu.value].selectedTabValue === 1
  ) {
    markdown = page111;
  }
  if (
    selectedMenu.value === 11 &&
    navigator[selectedMenu.value].selectedTabValue === 2
  ) {
    markdown = page112;
  }
  if (
    selectedMenu.value === 20 &&
    navigator[selectedMenu.value].selectedTabValue === 0
  ) {
    markdown = page200;
  }
  if (
    selectedMenu.value === 20 &&
    navigator[selectedMenu.value].selectedTabValue === 1
  ) {
    markdown = page201;
  }
  if (
    selectedMenu.value === 21 &&
    navigator[selectedMenu.value].selectedTabValue === 0
  ) {
    markdown = page210;
  }
  if (
    selectedMenu.value === 21 &&
    navigator[selectedMenu.value].selectedTabValue === 1
  ) {
    markdown = page211;
  }
  if (
    selectedMenu.value === 22 &&
    navigator[selectedMenu.value].selectedTabValue === 0
  ) {
    markdown = page220;
  }
  if (
    selectedMenu.value === 22 &&
    navigator[selectedMenu.value].selectedTabValue === 1
  ) {
    markdown = page221;
  }
  if (
    selectedMenu.value === 23 &&
    navigator[selectedMenu.value].selectedTabValue === 0
  ) {
    markdown = page230;
  }
  if (
    selectedMenu.value === 23 &&
    navigator[selectedMenu.value].selectedTabValue === 1
  ) {
    markdown = page231;
  }
  if (
    selectedMenu.value === 24 &&
    navigator[selectedMenu.value].selectedTabValue === 0
  ) {
    markdown = page240;
  }
  if (
    selectedMenu.value === 24 &&
    navigator[selectedMenu.value].selectedTabValue === 1
  ) {
    markdown = page241;
  }
  if (
    selectedMenu.value === 25 &&
    navigator[selectedMenu.value].selectedTabValue === 0
  ) {
    markdown = page250;
  }
  if (
    selectedMenu.value === 25 &&
    navigator[selectedMenu.value].selectedTabValue === 1
  ) {
    markdown = page251;
  }
  if (
    selectedMenu.value === 26 &&
    navigator[selectedMenu.value].selectedTabValue === 0
  ) {
    markdown = page260;
  }
  if (
    selectedMenu.value === 26 &&
    navigator[selectedMenu.value].selectedTabValue === 1
  ) {
    markdown = page261;
  }
  if (
    selectedMenu.value === 27 &&
    navigator[selectedMenu.value].selectedTabValue === 0
  ) {
    markdown = page270;
  }
  if (
    selectedMenu.value === 27 &&
    navigator[selectedMenu.value].selectedTabValue === 1
  ) {
    markdown = page271;
  }
  if (
    selectedMenu.value === 28 &&
    navigator[selectedMenu.value].selectedTabValue === 0
  ) {
    markdown = page280;
  }
  if (
    selectedMenu.value === 28 &&
    navigator[selectedMenu.value].selectedTabValue === 1
  ) {
    markdown = page281;
  }
  return (
    <>
      <ReactMarkdown children={markdown} />
    </>
  );
}
