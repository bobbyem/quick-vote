import { Button } from "primereact/button";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCreatorEmail, setPollInfo } from "../features/slices/appSlice";
import { RootState } from "../features/store";

function PollSetup() {
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const questionInput = useRef<HTMLInputElement>(null);
  const { creator, pollInfo } = useSelector(
    (state: RootState) => state.reducers.appReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //useEffects
  useEffect(() => {
    if (creator.email) {
      setEmail(creator.email);
    }
    if (pollInfo.question) {
      setQuestion(pollInfo.question);
    }
  }, [creator, pollInfo]);

  //Functions
  function handleNext(): void {
    if (email && question) {
      dispatch(setCreatorEmail(email));
      dispatch(setPollInfo({ ...pollInfo, question: question }));
      navigate("/polloptions");
    }
  }

  return (
    <section className="page justify-content-end fadein">
      <h5>Poll information</h5>
      <p>Each poll will be deleted after 24h</p>
      <div className="field">
        <label htmlFor="email">
          Your email(for sending you the poll links)
        </label>
        <input
          autoFocus
          value={email}
          id="email"
          type="email"
          className="text-3xl text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && questionInput.current) {
              questionInput.current.focus();
            }
          }}
        />
      </div>
      <div className="field">
        <label htmlFor="question">Poll Question(What are we voting on?)</label>
        <input
          ref={questionInput}
          value={question}
          id="question"
          type="text"
          className="input text-3xl text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleNext();
            }
          }}
        />
      </div>
      <Button
        className="bg-pink-200"
        label="NEXT"
        disabled={email.length < 5 || question.length < 5 ? true : false}
        onClick={() => {
          handleNext();
        }}
      />
    </section>
  );
}

export default PollSetup;
