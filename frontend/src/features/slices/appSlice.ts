import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface AppState {
  creator: {
    email: string;
  };
  pollInfo: {
    question: string;
    options: Array<string>;
  };
  vote: Number | null;
  prevPolls: Array<string>;
}

const initialState: AppState = {
  creator: {
    email: "bobbyem@gmail.com",
  },
  pollInfo: {
    question: "",
    options: [],
  },
  vote: null,
  prevPolls: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    reset(state) {
      return initialState;
    },
    setCreatorEmail(state, action) {
      state.creator.email = action.payload;
    },
    setPollInfo(state, action) {
      state.pollInfo = action.payload;
    },
    addOption(state, action) {
      state.pollInfo.options.push(action.payload);
    },
    removeOption(state, action) {
      const newOptions = [...state.pollInfo.options];
      newOptions.splice(action.payload, 1);
      state.pollInfo.options = newOptions;
    },
    setVote(state, action) {
      state.vote = action.payload;
    },
  },
});

export const {
  reset,
  setCreatorEmail,
  setPollInfo,
  addOption,
  removeOption,
  setVote,
} = appSlice.actions;
export default appSlice.reducer;
