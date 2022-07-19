import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import sessionService from "../services/sessionService";

//Types interfaces
export interface Session {
  creator: {
    email: string;
  };
  pollInfo: {
    question: string;
    options: Array<string>;
  };
  vote: Number | null;
}

export interface SessionState {
  session: null | Session;
  pollId: string | null;
  message: string | null;
}

//Variables
const initialState: SessionState = {
  session: null,
  pollId: null,
  message: null,
};

//Thunk Functions
export const fetchPollById = createAsyncThunk(
  "session/fetchPollById",
  async (id: any, thunkAPI) => {
    const response = await sessionService.fetchById(id);
    return response;
  }
);

export const addVote = createAsyncThunk(
  "session/addVote",
  async (voteData: any, thunkAPI) => {
    const response = await sessionService.fetchById(voteData);
    return response;
  }
);

//Slice
export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setPollId(state, action) {
      state.pollId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPollById.fulfilled, (state, action) => {
        state.session = action.payload;
      })
      .addCase(addVote.fulfilled, (state, action) => {
        state.message = action.payload;
      });
  },
});
export const { setPollId } = sessionSlice.actions;
export default sessionSlice.reducer;
