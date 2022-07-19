import axios from "axios";

const BASE_URL = "/api/polls";

const fetchById = async (id: string) => {
  const response = await axios.get(BASE_URL + "/" + id);
  return response.data;
};

const addVoteById = async (voteData: any) => {
  const response = await axios.put("/api/polls/vote/" + voteData.id, {
    voteData,
  });
  return response.data;
};

const sessionService = { fetchById, addVoteById };
export default sessionService;
