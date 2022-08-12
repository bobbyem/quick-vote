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
import Mailer from "../components/Mailer";

function Recipt() {
  const [copied, setCopied] = useState(false);
  const { session, pollId, emailSent } = useSelector(
    (state: RootState) => state.reducers.sessionReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //useEffects
  useEffect(() => {
    if (session && !pollId) {
      dispatch(setPollId(session._id));
    }
    if (emailSent) {
      dispatch(reset());
    }
    if (!session) {
      navigate("/");
    }
  }, [session, pollId, emailSent]);

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
    const URL = `https://quick-vote-poll.herokuapp.com/vote/${session._id}`;
    return (
      <section className="page justify-content-between fadein">
        <div className="flex flex-column justify-content-center h-full">
          <h2>
            <span className="text-base">Poll question: </span>
            <br></br>
            {session.pollInfo.question}
          </h2>
          <p className="text-xs">Poll Id: {session._id}</p>
          <h2 className="text-base">Options:</h2>
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
        </div>

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
        <Mailer URL={URL} />
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
