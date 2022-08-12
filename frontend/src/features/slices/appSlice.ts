import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";
import appServices from "../services/appService";

//Interfaces types
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

//Variables
const prevPolls = localStorage.getItem("_prevPolls")
  ? JSON.parse(localStorage.getItem("_prevPolls") || "")
  : null;

const initialState: AppState = {
  creator: {
    email: "",
  },
  pollInfo: {
    question: "",
    options: [],
  },
  vote: null,
  prevPolls: prevPolls ? prevPolls : [],
};

//thunkFunctions
export const addToPrevPolls = createAsyncThunk(
  "app/addToPrevPolls",
  async (pollId: string) => {
    const response = await appServices.addToPrevPolls(pollId);
    return response;
  }
);

//Slice
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
  extraReducers: (builder) => {
    builder.addCase(addToPrevPolls.fulfilled, (state, action) => {
      state.prevPolls = action.payload;
    });
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
