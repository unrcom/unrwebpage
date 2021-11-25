import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface SelectedMenu {
  value: number;
}

export interface Tab {
  selected: boolean;
  title: string;
}

export interface Content {
  selected: boolean;
  title: string;
  tabCnt: number;
  selectedTabValue: number;
  tab: Tab[];
}

export interface SelectedVote {
  id: string;
}

export interface SelectedVoteIdx {
  idx: number;
}

//Review later
export interface NavigatorStates {
  selectedMenu: SelectedMenu;
  navigatorState: Content[];
  selectedVote: SelectedVote;
  selectedVoteIdx: SelectedVoteIdx;
}

const initialState: NavigatorStates = {
  selectedMenu: { value: 0 },
  navigatorState: [
    {
      selected: true,
      title: "当デモサイトについて",
      tabCnt: 0,
      selectedTabValue: 0,
      tab: [{ selected: true, title: "" }],
    },
    {
      selected: false,
      title: "会社概要",
      tabCnt: 4,
      selectedTabValue: 0,
      tab: [
        { selected: true, title: "基本情報" },
        { selected: false, title: "目的" },
        { selected: false, title: "公告" },
        { selected: false, title: "基準日" },
      ],
    },
    {
      selected: false,
      title: "お問い合わせ",
      tabCnt: 0,
      selectedTabValue: 0,
      tab: [{ selected: true, title: "" }],
    },
    {
      selected: false,
      title: "",
      tabCnt: 0,
      selectedTabValue: 0,
      tab: [{ selected: true, title: "" }],
    },
    {
      selected: false,
      title: "",
      tabCnt: 0,
      selectedTabValue: 0,
      tab: [{ selected: true, title: "" }],
    },
    {
      selected: false,
      title: "",
      tabCnt: 0,
      selectedTabValue: 0,
      tab: [{ selected: true, title: "" }],
    },
    {
      selected: false,
      title: "",
      tabCnt: 0,
      selectedTabValue: 0,
      tab: [{ selected: true, title: "" }],
    },
    {
      selected: false,
      title: "",
      tabCnt: 0,
      selectedTabValue: 0,
      tab: [{ selected: true, title: "" }],
    },
    {
      selected: false,
      title: "",
      tabCnt: 0,
      selectedTabValue: 0,
      tab: [{ selected: true, title: "" }],
    },
    {
      selected: false,
      title: "",
      tabCnt: 0,
      selectedTabValue: 0,
      tab: [{ selected: true, title: "" }],
    },
    {
      selected: false,
      title: "認証",
      tabCnt: 3,
      selectedTabValue: 0,
      tab: [
        { selected: true, title: "Demo" },
        { selected: false, title: "概要" },
        { selected: false, title: "使い方" },
      ],
    },
    {
      selected: false,
      title: "３目並べ",
      tabCnt: 3,
      selectedTabValue: 0,
      tab: [
        { selected: true, title: "Demo" },
        { selected: false, title: "概要" },
        { selected: false, title: "使い方" },
      ],
    },
    {
      selected: false,
      title: "予約",
      tabCnt: 3,
      selectedTabValue: 0,
      tab: [
        { selected: true, title: "Demo" },
        { selected: false, title: "概要" },
        { selected: false, title: "使い方" },
      ],
    },
    {
      selected: false,
      title: "勤務",
      tabCnt: 3,
      selectedTabValue: 0,
      tab: [
        { selected: true, title: "Demo" },
        { selected: false, title: "概要" },
        { selected: false, title: "使い方" },
      ],
    },
    {
      selected: false,
      title: "原価",
      tabCnt: 3,
      selectedTabValue: 0,
      tab: [
        { selected: true, title: "Demo" },
        { selected: false, title: "概要" },
        { selected: false, title: "使い方" },
      ],
    },
    {
      selected: false,
      title: "販売",
      tabCnt: 3,
      selectedTabValue: 0,
      tab: [
        { selected: true, title: "Demo" },
        { selected: false, title: "概要" },
        { selected: false, title: "使い方" },
      ],
    },
    {
      selected: false,
      title: "履歴",
      tabCnt: 3,
      selectedTabValue: 0,
      tab: [
        { selected: true, title: "Demo" },
        { selected: false, title: "概要" },
        { selected: false, title: "使い方" },
      ],
    },
    {
      selected: false,
      title: "",
      tabCnt: 0,
      selectedTabValue: 0,
      tab: [{ selected: true, title: "" }],
    },
    {
      selected: false,
      title: "",
      tabCnt: 0,
      selectedTabValue: 0,
      tab: [{ selected: true, title: "" }],
    },
    {
      selected: false,
      title: "",
      tabCnt: 0,
      selectedTabValue: 0,
      tab: [{ selected: true, title: "" }],
    },
    {
      selected: false,
      title: "React",
      tabCnt: 2,
      selectedTabValue: 0,
      tab: [
        { selected: true, title: "一次情報" },
        { selected: false, title: "トレンド" },
      ],
    },
    {
      selected: false,
      title: "TypeScript",
      tabCnt: 2,
      selectedTabValue: 0,
      tab: [
        { selected: true, title: "一次情報" },
        { selected: false, title: "トレンド" },
      ],
    },
    {
      selected: false,
      title: "Redux",
      tabCnt: 2,
      selectedTabValue: 0,
      tab: [
        { selected: true, title: "一次情報" },
        { selected: false, title: "トレンド" },
      ],
    },
    {
      selected: false,
      title: "Firebase",
      tabCnt: 2,
      selectedTabValue: 0,
      tab: [
        { selected: true, title: "一次情報" },
        { selected: false, title: "トレンド" },
      ],
    },
    {
      selected: false,
      title: "AWS Route53",
      tabCnt: 2,
      selectedTabValue: 0,
      tab: [
        { selected: true, title: "一次情報" },
        { selected: false, title: "トレンド" },
      ],
    },
    {
      selected: false,
      title: "AWS CloudFront",
      tabCnt: 2,
      selectedTabValue: 0,
      tab: [
        { selected: true, title: "一次情報" },
        { selected: false, title: "トレンド" },
      ],
    },
    {
      selected: false,
      title: "Docker",
      tabCnt: 2,
      selectedTabValue: 0,
      tab: [
        { selected: true, title: "一次情報" },
        { selected: false, title: "トレンド" },
      ],
    },
    {
      selected: false,
      title: "Kubernetes",
      tabCnt: 2,
      selectedTabValue: 0,
      tab: [
        { selected: true, title: "一次情報" },
        { selected: false, title: "トレンド" },
      ],
    },
    {
      selected: false,
      title: "Ansible",
      tabCnt: 2,
      selectedTabValue: 0,
      tab: [
        { selected: true, title: "一次情報" },
        { selected: false, title: "トレンド" },
      ],
    },
    {
      selected: false,
      title: "",
      tabCnt: 1,
      selectedTabValue: 0,
      tab: [{ selected: false, title: "" }],
    },
  ],
  selectedVote: { id: "" },
  selectedVoteIdx: { idx: 0 },
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

// export const incrementAsync = createAsyncThunk(
//   "counter/fetchCount",
//   async (amount: number) => {
//     const response = await fetchCount(amount);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

export const navigatorSlice = createSlice({
  name: "navigator",
  initialState,
  reducers: {
    mod: (state, action: PayloadAction<number>) => {
      for (let i = 0; i < 30; i++) {
        state.navigatorState[i].selected = false;
      }
      state.navigatorState[action.payload].selected = true;
      state.selectedMenu.value = action.payload;
    },
    tabMod: (state, action: PayloadAction<number>) => {
      for (
        let i = 0;
        i < state.navigatorState[state.selectedMenu.value].tabCnt;
        i++
      ) {
        state.navigatorState[state.selectedMenu.value].tab[i].selected = false;
      }
      state.navigatorState[state.selectedMenu.value].selectedTabValue =
        action.payload;
      state.navigatorState[state.selectedMenu.value].tab[
        action.payload
      ].selected = true;
    },
    voteMod: (state, action: PayloadAction<string>) => {
      state.selectedVote.id = action.payload;
    },
    voteMod2: (state, action: PayloadAction<number>) => {
      state.selectedVoteIdx.idx = action.payload;
    },
  },
});

export const { mod, tabMod, voteMod, voteMod2 } = navigatorSlice.actions;

export const selectNavigator = (state: RootState) =>
  state.navigator.navigatorState;
export const selectSelectedMenu = (state: RootState) =>
  state.navigator.selectedMenu;
export const selectSelectedVote = (state: RootState) =>
  state.navigator.selectedVote;
export const selectSelectedVoteIdx = (state: RootState) =>
  state.navigator.selectedVoteIdx;

export default navigatorSlice.reducer;
