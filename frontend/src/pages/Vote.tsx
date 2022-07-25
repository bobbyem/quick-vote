import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Option from "../components/Option";
import {
  addVote,
  fetchPollById,
  setPollId,
} from "../features/slices/sessionSlice";
import { AppDispatch, RootState } from "../features/store";

function Vote() {
  const { id } = useParams();
  const [voted, setVoted] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { session, status } = useSelector(
    (state: RootState) => state.reducers.sessionReducer
  );
  const { vote } = useSelector((state: RootState) => state.reducers.appReducer);

  //UseEffects
  useEffect(() => {
    if (id) {
      dispatch(setPollId(id));
      dispatch(fetchPollById(id));
    }
  }, [id]);

  useEffect(() => {
    if (voted) {
      navigate(`/result/${id}`);
    }
  }, [voted]);

  //Functions
  function handleSubmit() {
    if (id && !voted && (vote || vote === 0)) {
      const voteData = { id, vote };
      setVoted(true);
      dispatch(addVote(voteData));
      return;
    }
    console.log(id, voted);
  }

  if (session) {
    const { pollInfo } = session;
    const { question, options } = pollInfo;

    return (
      <section className="page justify-content-between fadein">
        <h1 className="text-center">Vote</h1>
        <p className="text-center text-xs">
          pollId: {id ? id : "You are missing a valid Poll id"}
        </p>
        <h2 className="text-center">{question}</h2>
        <section className="overflow-y-scroll mr-4 ml-4">
          {options.length > 0
            ? options.map((option: string, index: number) => {
                return (
                  <Option
                    key={index}
                    title={option}
                    votable={true}
                    removable={false}
                    index={index}
                  />
                );
              })
            : null}
        </section>
        <div className="flex flex-column gap-3 p-2">
          <Button
            icon="pi pi-check-circle"
            className="bg-pink-200"
            label={voted ? "Thanks for your vote!" : "SUBMIT"}
            disabled={vote === null ? true : false}
            onClick={handleSubmit}
          />
        </div>
      </section>
    );
  }
  return (
    <section>
      <h1>No Poll found</h1>
    </section>
  );
}

export default Vote;
