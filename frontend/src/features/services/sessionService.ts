import axios from "axios";
import emailj from "emailjs-com";
const BASE_URL = "/api/polls";

//Services
const fetchById = async (id: string) => {
  const response = await axios.get(BASE_URL + "/" + id);
  return response.data;
};

const addVoteById = async (voteData: any) => {
  const { id, vote } = voteData;
  const response = await axios.put("/api/polls/vote/", {
    id,
    vote,
  });
  return response.data;
};

const createPoll = async (polldata: {}) => {
  const response = await axios.post(BASE_URL + "/create", polldata);
  return response.data;
};

const sessionService = { fetchById, addVoteById, createPoll };

export default sessionService;
