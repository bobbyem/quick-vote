import { Button } from "primereact/button";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Option from "../components/Option";
import {
  addVote,
  fetchPollById,
  setPollId,
} from "../features/slices/sessionSlice";
import { AppDispatch, RootState } from "../features/store";

function Vote() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { session } = useSelector(
    (state: RootState) => state.reducers.sessionReducer
  );
  const { vote } = useSelector((state: RootState) => state.reducers.appReducer);

  useEffect(() => {
    if (id) {
      dispatch(setPollId(id));
      dispatch(fetchPollById(id));
    }
  }, [id]);

  function handleSubmit() {
    if (id && session && vote) {
      const voteData = { id, vote };
      dispatch(addVote(voteData));
    }
  }

  if (session) {
    const { pollInfo } = session;
    const { question, options } = pollInfo;

    return (
      <section className="flex flex-column h-full justify-content-between">
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
            label="SUBMIT"
            disabled={vote === null ? true : false}
            onClick={handleSubmit}
          />
        </div>
      </section>
    );
  }
  return null;
}

export default Vote;
