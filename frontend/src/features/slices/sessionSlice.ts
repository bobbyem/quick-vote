import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  votes: Array<number> | null;
  _id: string | null;
}

export interface SessionState {
  session: null | Session;
  pollId: string | null;
  message: string | null;
  status: {
    pending: boolean;
    error: boolean;
    success: boolean;
  };
}

//Variables
const initialState: SessionState = {
  session: null,
  pollId: null,
  message: null,
  status: {
    pending: false,
    error: false,
    success: false,
  },
};

//Thunk Functions
export const fetchPollById = createAsyncThunk(
  "session/fetchPollById",
  async (id: any, thunkAPI) => {
    const response = await sessionService.fetchById(id);
    return response;
  }
);

//Create poll
export const createPoll = createAsyncThunk(
  "session/createPoll",
  async (pollData: {}, thunkAPI) => {
    const response = await sessionService.createPoll(pollData);
    return response;
  }
);

//Not working
export const addVote = createAsyncThunk(
  "session/addVote",
  async (voteData: any, thunkAPI) => {
    try {
      return await sessionService.addVoteById(voteData);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Slice
export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    reset(state) {
      return initialState;
    },
    setPollId(state, action) {
      state.pollId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPollById.fulfilled, (state, action) => {
        state.session = action.payload;
        state.status.pending = false;
        state.status.error = false;
        state.status.success = true;
      })
      .addCase(fetchPollById.pending, (state) => {
        state.status.pending = true;
        state.status.error = false;
        state.status.success = false;
      })
      .addCase(createPoll.fulfilled, (state, action) => {
        state.session = action.payload;
      })
      .addCase(addVote.fulfilled, (state, action) => {
        state.session = action.payload;
        state.status.pending = false;
        state.status.error = false;
        state.status.success = true;
      })
      .addCase(addVote.pending, (state) => {
        state.status.pending = true;
        state.status.error = false;
        state.status.success = false;
      })
      .addCase(addVote.rejected, (state, action: PayloadAction<any>) => {
        state.status.pending = false;
        state.status.error = true;
        state.status.success = false;
        state.message = action.payload;
      });
  },
});
export const { reset, setPollId } = sessionSlice.actions;
export default sessionSlice.reducer;
