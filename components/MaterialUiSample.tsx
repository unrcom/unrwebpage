import React from "react";
import { Button, makeStyles, Typography, Grid, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  btnStyles: {
    background: "green",
    padding: "3px 50px",
  },
  typoStyle: {
    color: "blue",
  },
  papreStyle: {
    background: "orange",
    padding: theme.spacing(4),
    textAlign: "left",
    color: theme.palette.text.primary,
  },
  papreStyleS: {
    background: "orange",
    padding: theme.spacing(1),
    textAlign: "left",
    color: theme.palette.text.primary,
  },
  papreStyleM: {
    background: "orange",
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.primary,
  },
  papreStyleL: {
    background: "orange",
    padding: theme.spacing(3),
    textAlign: "left",
    color: theme.palette.text.primary,
  },
}));

const MaterialUiSample: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography className={classes.typoStyle} align="left">
        xs={12} の場合は１行に１つ
        <br />
        xs={6} の場合は１行に２つ
        <br />
        xs={6} の場合は１行に４つのコンテナを表示します
      </Typography>

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.papreStyle}>xs=12</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.papreStyle}>xs=6</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.papreStyle}>xs=6</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.papreStyle}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.papreStyle}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.papreStyle}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.papreStyle}>xs=3</Paper>
        </Grid>
      </Grid>

      <br />
      <Typography className={classes.typoStyle} align="left">
        xs={1} の３つのコンテナを direction を変えて表示します
        <br />
        (direction="row")
      </Typography>
      <Grid container spacing={1} direction="row">
        <Grid item xs={1}>
          <Paper className={classes.papreStyleS}>Cell 1</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.papreStyleM}>Cell 2</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.papreStyleL}>Cell 3</Paper>
        </Grid>
      </Grid>

      <Typography className={classes.typoStyle} align="left">
        (direction="row-reverse")
      </Typography>
      <Grid container spacing={1} direction="row-reverse">
        <Grid item xs={1}>
          <Paper className={classes.papreStyleS}>Cell 1</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.papreStyleM}>Cell 2</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.papreStyleL}>Cell 3</Paper>
        </Grid>
      </Grid>

      <Typography className={classes.typoStyle} align="left">
        (direction="column")
      </Typography>
      <Grid container spacing={1} direction="column">
        <Grid item xs={1}>
          <Paper className={classes.papreStyleS}>Cell 1</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.papreStyleM}>Cell 2</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.papreStyleL}>Cell 3</Paper>
        </Grid>
      </Grid>

      <Typography className={classes.typoStyle} align="left">
        (direction="column-reverse")
      </Typography>
      <Grid container spacing={1} direction="column-reverse">
        <Grid item xs={1}>
          <Paper className={classes.papreStyleS}>Cell 1</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.papreStyleM}>Cell 2</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.papreStyleL}>Cell 3</Paper>
        </Grid>
      </Grid>

      <br />

      <Typography className={classes.typoStyle} align="left">
        xs={1} の３つのコンテナを justify を変えて表示します
        <br />
        (justify="flex-start")
      </Typography>
      <Grid container spacing={1} justify="flex-start">
        <Grid item xs={1}>
          <Paper className={classes.papreStyleS}>Cell 1</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.papreStyleM}>Cell 2</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.papreStyleL}>Cell 3</Paper>
        </Grid>
      </Grid>

      <Typography className={classes.typoStyle} align="left">
        (justify="center")
      </Typography>
      <Grid container spacing={1} justify="center">
        <Grid item xs={1}>
          <Paper className={classes.papreStyleS}>Cell 1</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.papreStyleM}>Cell 2</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.papreStyleL}>Cell 3</Paper>
        </Grid>
      </Grid>

      <Typography className={classes.typoStyle} align="left">
        (justify="flex-end")
      </Typography>
      <Grid container spacing={1} justify="flex-end">
        <Grid item xs={1}>
          <Paper className={classes.papreStyleS}>Cell 1</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.papreStyleM}>Cell 2</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.papreStyleL}>Cell 3</Paper>
        </Grid>
      </Grid>

      <Typography className={classes.typoStyle} align="left">
        (justify="space-between")
      </Typography>
      <Grid container spacing={1} justify="space-between">
        <Grid item xs={1}>
          <Paper className={classes.papreStyleS}>Cell 1</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.papreStyleM}>Cell 2</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.papreStyleL}>Cell 3</Paper>
        </Grid>
      </Grid>

      <Typography className={classes.typoStyle} align="left">
        (justify="space-around")
      </Typography>
      <Grid container spacing={1} justify="space-around">
        <Grid item xs={1}>
          <Paper className={classes.papreStyleS}>Cell 1</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.papreStyleM}>Cell 2</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.papreStyleL}>Cell 3</Paper>
        </Grid>
      </Grid>

      <Typography className={classes.typoStyle} align="left">
        (justify="space-evenly")
      </Typography>
      <Grid container spacing={1} justify="space-evenly">
        <Grid item xs={1}>
          <Paper className={classes.papreStyleS}>Cell 1</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.papreStyleM}>Cell 2</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.papreStyleL}>Cell 3</Paper>
        </Grid>
      </Grid>

      <br />

      <Typography className={classes.typoStyle} align="left">
        xs={1} の３つのコンテナを alignItems を変えて表示します
        <br />
        (alignItems="flex-start")
      </Typography>
      <Grid container spacing={1} alignItems="flex-start">
        <Grid item xs={1}>
          <Paper className={classes.papreStyleS}>Cell 1</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.papreStyleM}>Cell 2</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.papreStyleL}>Cell 3</Paper>
        </Grid>
      </Grid>

      <Typography className={classes.typoStyle} align="left">
        (alignItems="center")
      </Typography>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={1}>
          <Paper className={classes.papreStyleS}>Cell 1</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.papreStyleM}>Cell 2</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.papreStyleL}>Cell 3</Paper>
        </Grid>
      </Grid>

      <Typography className={classes.typoStyle} align="left">
        (alignItems="flex-end")
      </Typography>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item xs={1}>
          <Paper className={classes.papreStyleS}>Cell 1</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.papreStyleM}>Cell 2</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.papreStyleL}>Cell 3</Paper>
        </Grid>
      </Grid>

      <Typography className={classes.typoStyle} align="left">
        (alignItems="stretch")
      </Typography>
      <Grid container spacing={1} alignItems="stretch">
        <Grid item xs={1}>
          <Paper className={classes.papreStyleS}>Cell 1</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.papreStyleM}>Cell 2</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.papreStyleL}>Cell 3</Paper>
        </Grid>
      </Grid>

      <Typography className={classes.typoStyle} align="left">
        (alignItems="baseline")
      </Typography>
      <Grid container spacing={1} alignItems="baseline">
        <Grid item xs={1}>
          <Paper className={classes.papreStyleS}>Cell 1</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.papreStyleM}>Cell 2</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.papreStyleL}>Cell 3</Paper>
        </Grid>
      </Grid>

      <br />

      <Typography className={classes.typoStyle} align="left">
        (direction="column" justify="space-evenly")
      </Typography>
      <Grid container spacing={1} direction="column" justify="space-evenly">
        <Grid item xs={1}>
          <Paper className={classes.papreStyleS}>Cell 1</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.papreStyleM}>Cell 2</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.papreStyleL}>Cell 3</Paper>
        </Grid>
      </Grid>

      <Typography className={classes.typoStyle} align="left">
        (direction="column" alignItems="center")
      </Typography>
      <Grid container spacing={1} direction="column" alignItems="center">
        <Grid item xs={1}>
          <Paper className={classes.papreStyleS}>Cell 1</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.papreStyleM}>Cell 2</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.papreStyleL}>Cell 3</Paper>
        </Grid>
      </Grid>

      <br />

      <Grid container spacing={3} direction="column">
        <Grid item xs={12} container>
          <Grid item xs={2}>
            Demo
          </Grid>
          <Grid item xs={8}></Grid>
          <Grid item xs={2}>
            Test
          </Grid>
        </Grid>
        <Grid item xs={12} container justify="space-around">
          <Grid item xs={3}>
            社名: アンリモート合同会社 ドメイン: unremoted.com 設立: 2021年 4月
            13日 決算月: 3月 住所:
            東京都新宿区新宿５−１１−３０　第五葉山ビル３階３０８号室
            メイン金融機関: 東京三協信用金庫　新宿支店
          </Grid>
          <Grid item xs={3}>
            社名: アンリモート合同会社 ドメイン: unremoted.com 設立: 2021年 4月
            13日 決算月: 3月 住所:
            東京都新宿区新宿５−１１−３０　第五葉山ビル３階３０８号室
            メイン金融機関: 東京三協信用金庫　新宿支店
          </Grid>
          <Grid item xs={3}>
            社名: アンリモート合同会社 ドメイン: unremoted.com 設立: 2021年 4月
            13日 決算月: 3月 住所:
            東京都新宿区新宿５−１１−３０　第五葉山ビル３階３０８号室
            メイン金融機関: 東京三協信用金庫　新宿支店
            都営新宿線の新宿三丁目駅から徒歩５分、副都心線、丸の内線の新宿三丁目駅から徒歩１０分ほどとなります。
            （紳士服の「坂善」の向かい側、「オーディオユニオン新宿店」の上です）
            お手伝い可能な領域
          </Grid>
        </Grid>
      </Grid>

      <Button variant="text">default color Button</Button>
      <Button variant="text" color="primary">
        primary color Button
      </Button>
      <Button variant="text" color="secondary">
        secondary color Button
      </Button>
      <Button variant="text" color="inherit">
        inherit color Button
      </Button>
      <br />
      <Button variant="contained">default color Button</Button>
      <Button className={classes.btnStyles} variant="contained" color="primary">
        primary color Button
      </Button>
      <br />
      <Button variant="outlined" color="secondary">
        secondary color Button
      </Button>
      <Button variant="outlined" color="inherit">
        inherit color Button
      </Button>
    </div>
  );
};

export default MaterialUiSample;
