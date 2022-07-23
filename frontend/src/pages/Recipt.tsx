import { useSelector } from "react-redux";
import { RootState } from "../features/store";
import { ProgressSpinner } from "primereact/progressspinner";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPollId } from "../features/slices/sessionSlice";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { reset } from "../features/slices/appSlice";

function Recipt() {
  const [copied, setCopied] = useState(false);
  const { session, pollId } = useSelector(
    (state: RootState) => state.reducers.sessionReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (session && !pollId) {
      dispatch(setPollId(session._id));
    }
  }, [session, pollId]);

  useEffect(() => {
    dispatch(reset());
  }, []);

  //Functions
  function handleCopy(URL: string): void {
    navigator.clipboard.writeText(URL);
    setCopied(true);
  }

  function handleVote(id: string | null): void {
    if (pollId) {
      navigate(`/vote/${id}`);
    }
  }

  if (session) {
    const URL = `https://quickvote/vote/${session._id}`;
    return (
      <section className="flex flex-column h-full justify-content-center align-items-center">
        <h1>{session.pollInfo.question}</h1>
        <p>Poll Id: {session._id}</p>
        <h1>Options:</h1>
        <div>
          {session.pollInfo.options.map((option, index) => {
            return (
              <h4 key={index} className="capitalize">
                {option}
              </h4>
            );
          })}
        </div>
        <h1>
          URL:{" "}
          <span
            className="underline cursor-pointer"
            onClick={() => handleVote(session._id)}
          >
            {URL}
          </span>
        </h1>
        <Button
          label={copied ? "Copied!" : "copy to clipboard"}
          onClick={() => handleCopy(URL)}
        />
        <section className="flex flex-column w-full pr-4 pl-4 gap-2">
          <Button label="VOTE" onClick={() => handleVote(session._id)} />
          <Button
            label="RESULT"
            onClick={() => {
              navigate("/result");
            }}
          />
        </section>
      </section>
    );
  }

  return (
    <div>
      <ProgressSpinner />
    </div>
  );
}

export default Recipt;
