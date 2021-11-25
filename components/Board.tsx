import React from "react";
import Square from "./Square";
import styles from "./Board.module.css";

const Board: React.FC = () => {
  const [squares, setSquares] = React.useState(Array(9).fill(""));

  const handleClick = (i: number) => {
    const newSquares: string[] = [];
    let idx = 0;
    for (let square of squares) {
      console.log(`i: ${i}, square: ${square}`);
      if (idx === i) {
        newSquares.push("X");
      } else {
        newSquares.push(square);
      }
      idx = idx + 1;
    }
    setSquares(newSquares);
  };

  const renderSquare = (i: number) => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  };

  const status = "Next player: X";

  return (
    <div>
      <div className={styles.status}>{status}</div>
      <div className={styles.boardrow}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className={styles.boardrow}>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className={styles.boardrow}>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

// import React from "react";
// import Square from "./Square";
// import styles from "./Board.module.css";

// const Board: React.FC = () => {
//   const [value, setValue] = React.useState({});

//   handleClick(i) {
//     setValue([i] = 'X';
//     this.setState({squares: squares});
//   }

//   const renderSquare = (i: number) => {

//     return <Square value={value[{}]} onClick={() => handleClick(i)} />;
//   };

//   const status = "Next player: X";

//   return (
//     <div>
//       <div className={styles.status}>{status}</div>
//       <div className={styles.boardrow}>
//         {renderSquare("Square0")}
//         {renderSquare("Square1")}
//         {renderSquare("Square2")}
//       </div>
//       <div className={styles.boardrow}>
//         {renderSquare("Square3")}
//         {renderSquare("Square4")}
//         {renderSquare("Square5")}
//       </div>
//       <div className={styles.boardrow}>
//         {renderSquare("Square6")}
//         {renderSquare("Square7")}
//         {renderSquare("Square8")}
//       </div>
//     </div>
//   );
// };

export default Board;
