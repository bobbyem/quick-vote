import { useSelector } from "react-redux";
import { RootState } from "../features/store";
import { ProgressSpinner } from "primereact/progressspinner";
import { ScrollPanel } from "primereact/scrollpanel";
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
      <section className="page justify-content-between fadein">
        <h1>{session.pollInfo.question}</h1>
        <p>Poll Id: {session._id}</p>
        <h1>Options:</h1>

        <ScrollPanel style={{ width: "100%", height: "200px" }}>
          {session.pollInfo.options.map((option, index) => {
            return (
              <h4 key={index} className="capitalize">
                - {option}
              </h4>
            );
          })}
        </ScrollPanel>

        <h1 className="overflow-hidden text-overflow-ellipsis">
          <span
            className="underline cursor-pointer"
            onClick={() => handleVote(session._id)}
          >
            {URL}
          </span>
        </h1>

        <section className="flex flex-column w-full gap-2">
          <Button
            icon="pi pi-copy"
            className="bg-pink-200"
            label={copied ? "Copied to clipboard!" : "copy to clipboard"}
            onClick={() => handleCopy(URL)}
          />
          <Button
            icon="pi pi-check-circle"
            className="bg-pink-200"
            label="VOTE"
            onClick={() => handleVote(session._id)}
          />
          <Button
            icon="pi pi-align-right"
            className="bg-pink-200"
            label="RESULT"
            onClick={() => {
              navigate(`/result/${pollId}`);
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
