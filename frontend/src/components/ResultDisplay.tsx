import { ProgressSpinner } from "primereact/progressspinner";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../features/store";
import ResultItem from "./ResultItem";

function ResultDisplay() {
  const { session } = useSelector(
    (state: RootState) => state.reducers.sessionReducer
  );

  if (session) {
    const { pollInfo } = session;
    return (
      <div>
        <h1>{pollInfo.question}</h1>
        {pollInfo.options.map((option, index) => {
          return <ResultItem option={option} index={index} key={index} />;
        })}
        <h4>{session.votes?.length} total votes</h4>
      </div>
    );
  }
  return <ProgressSpinner />;
}

export default ResultDisplay;
