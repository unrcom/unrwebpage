import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface TAISENRIREKI {
  squares: string[];
  addnum: number[];
  xnext: string;
  pos: number;
  history: string[][];
  movepos: number;
  zahyo: string[];
  aikotoba: string;
}

export interface RIREKI {
  taisenId: string;
  aikotoba: string;
  tmstmp_at: string;
  aite: string;
}

export interface userTaisenRireki {
  rireki: RIREKI[];
}

export const sanmokuOnlineSlice = createSlice({
  name: "sanmokuOnline",
  initialState: {
    taisenRireki: {
      squares: ["", "", "", "", "", "", "", "", ""],
      addnum: [0],
      xnext: "X",
      pos: 0,
      history: [["", "", "", "", "", "", "", "", ""]],
      movepos: 0,
      zahyo: [
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
      aikotoba: "",
    },
    userTaisenRireki: {
      rireki: [
        {
          taisenId: "",
          aikotoba: "",
          tmstmp_at: "",
          aite: "",
        },
      ],
    },
  },
  reducers: {
    add: (state, action: PayloadAction<number>) => {
      if (state.taisenRireki.squares[action.payload] !== "") {
        window.alert("選択済みのマス目はクリックできません");
      } else {
        state.taisenRireki.pos = action.payload;
        state.taisenRireki.squares[state.taisenRireki.pos] =
          state.taisenRireki.xnext;
        if (state.taisenRireki.xnext === "X") {
          state.taisenRireki.xnext = "O";
        } else {
          state.taisenRireki.xnext = "X";
        }
        state.taisenRireki.history.push(state.taisenRireki.squares);
        state.taisenRireki.addnum.push(state.taisenRireki.pos);
      }
    },
    mod: (state, action: PayloadAction<number>) => {
      state.taisenRireki.movepos = action.payload;
      const newHistory = [["", "", "", "", "", "", "", "", ""]];
      const newAddnum = [0];
      for (let i = 1; i <= state.taisenRireki.movepos; i++) {
        newHistory.push(state.taisenRireki.history[i]);
        newAddnum.push(state.taisenRireki.addnum[i]);
      }
      state.taisenRireki.history = newHistory;
      state.taisenRireki.addnum = newAddnum;
      state.taisenRireki.squares =
        state.taisenRireki.history[state.taisenRireki.history.length - 1];
      if (state.taisenRireki.movepos % 2 === 0) {
        state.taisenRireki.xnext = "X";
      } else {
        state.taisenRireki.xnext = "O";
      }
    },
    addAikotoba: (state, action: PayloadAction<string>) => {
      state.taisenRireki.aikotoba = action.payload;
    },
  },
});

export const { add, mod, addAikotoba } = sanmokuOnlineSlice.actions;

export const selectTaisenRireki = (state: RootState) =>
  state.sanmokuOnline.taisenRireki;
export const selectUserTaisenRireki = (state: RootState) =>
  state.sanmokuOnline.userTaisenRireki;

export default sanmokuOnlineSlice.reducer;
