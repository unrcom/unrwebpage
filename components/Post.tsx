import React from "react";
import styles from "./Post.module.css";
import None from "./None";

// import { makeStyles } from "@material-ui/core";
import Avatar from "@mui/material/Avatar";

interface PROPS {
  avatar: string;
  text: string;
  timestamp: any;
}

// const useStyles = makeStyles((theme) => ({
//   small: {
//     width: theme.spacing(3),
//     height: theme.spacing(3),
//     marginRight: theme.spacing(1),
//   },
// }));

const Post: React.FC<PROPS> = (props) => {
  // const classes = useStyles();
  console.log(props.avatar);
  console.log(props.text);
  console.log(props.timestamp);

  return (
    <>
      {props.text.length > 0 ? (
        <div className={styles.post}>
          <div className={styles.post_avatar}>
            <Avatar src={props.avatar} />
          </div>
          <div className={styles.post_body}>
            <div>
              <div className={styles.post_header}>
                <h3>
                  <span className={styles.post_headerTime}>
                    {props.timestamp}
                  </span>
                </h3>
              </div>
              <div className={styles.post_tweet}>{props.text}</div>
            </div>
          </div>
        </div>
      ) : (
        <None />
      )}
    </>
  );
};

export default Post;
