import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface CURRENT {
  squares: string[];
  xnext: string;
  pos: number;
}

export interface HISTORY {
  history: string[][];
  addnum: number[];
  movepos: number;
}

export interface ZAHYO {
  xy: string[];
}

export const sanmokuSlice = createSlice({
  name: "sanmoku",
  initialState: {
    current: {
      squares: ["", "", "", "", "", "", "", "", ""],
      xnext: "X",
      pos: 0,
    },
    history: {
      history: [["", "", "", "", "", "", "", "", ""]],
      addnum: [0],
      movepos: 0,
    },
    zahyo: {
      xy: [
        "行: 1, 列: 1",
        "行: 1, 列: 2",
        "行: 1, 列: 3",
        "行: 2, 列: 1",
        "行: 2, 列: 2",
        "行: 2, 列: 3",
        "行: 3, 列: 1",
        "行: 3, 列: 2",
        "行: 3, 列: 3",
      ],
    },
  },
  reducers: {
    add: (state, action: PayloadAction<number>) => {
      if (state.current.squares[action.payload] !== "") {
        window.alert("選択済みのマス目はクリックできません");
      } else {
        state.current.pos = action.payload;
        state.current.squares[state.current.pos] = state.current.xnext;
        if (state.current.xnext === "X") {
          state.current.xnext = "O";
        } else {
          state.current.xnext = "X";
        }
        state.history.history.push(state.current.squares);
        state.history.addnum.push(state.current.pos);
      }
    },
    mod: (state, action: PayloadAction<number>) => {
      state.history.movepos = action.payload;
      const newHistory = [["", "", "", "", "", "", "", "", ""]];
      const newAddnum = [0];
      for (let i = 1; i <= state.history.movepos; i++) {
        newHistory.push(state.history.history[i]);
        newAddnum.push(state.history.addnum[i]);
      }
      state.history.history = newHistory;
      state.history.addnum = newAddnum;
      state.current.squares =
        state.history.history[state.history.history.length - 1];
      if (state.history.movepos % 2 === 0) {
        state.current.xnext = "X";
      } else {
        state.current.xnext = "O";
      }
    },
  },
});

export const { add, mod } = sanmokuSlice.actions;

export const selectCurrent = (state: RootState) => state.sanmoku.current;
export const selectHistory = (state: RootState) => state.sanmoku.history;
export const selectZahyo = (state: RootState) => state.sanmoku.zahyo;

export default sanmokuSlice.reducer;
