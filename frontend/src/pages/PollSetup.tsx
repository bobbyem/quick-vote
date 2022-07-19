import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCreatorEmail, setPollInfo } from "../features/slices/appSlice";
import { RootState } from "../features/store";

function PollSetup() {
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const { creator, pollInfo } = useSelector(
    (state: RootState) => state.reducers.appReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (creator.email) {
      setEmail(creator.email);
    }
    if (pollInfo.question) {
      setQuestion(pollInfo.question);
    }
  }, [creator, pollInfo]);

  return (
    <div className="card text-xl pb-6 p-2">
      <h5>Poll information</h5>
      <p>Each poll will be deleted after 24h</p>
      <div className="field">
        <label htmlFor="email">
          Your email(for sending you the poll links)
        </label>
        <input
          value={email}
          id="email"
          type="email"
          className="text-3xl text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className="field">
        <label htmlFor="question">Poll Question(What are we voting on?)</label>
        <input
          value={question}
          id="question"
          type="text"
          className="text-3xl text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
        />
      </div>
      <Button
        label="NEXT"
        disabled={email.length < 5 || question.length < 5 ? true : false}
        onClick={() => {
          dispatch(setCreatorEmail(email));
          dispatch(setPollInfo({ ...pollInfo, question: question }));
          navigate("/polloptions");
        }}
      />
    </div>
  );
}

export default PollSetup;
