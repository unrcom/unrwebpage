import React from "react";
import styles from "./Square.module.css";

interface PROPS {
  value: string | null;
  onClick: any;
}

const Square: React.FC<PROPS> = (props) => {
  return (
    <>
      <button className={styles.square} onClick={() => props.onClick()}>
        {props.value}
      </button>
    </>
  );
};

// import React from "react";
// import styles from "./Square.module.css";

// interface PROPS {
//   value: number;
// }

// const Square: React.FC = () => {

//   return (
//     <>
//       <button className={styles.square} onClick={() => setValue("x")}>
//         {value}
//       </button>
//     </>
//   );
// };

export default Square;
