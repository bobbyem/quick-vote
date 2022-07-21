import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../features/store";

interface ResultItemProps {
  option: string;
  index: number;
}

function ResultItem(props: ResultItemProps) {
  const { option, index } = props;
  const [sumary, setSumary] = useState<Number[]>();
  const { session } = useSelector(
    (state: RootState) => state.reducers.sessionReducer
  );
  useEffect(() => {
    if (session) {
      let votes = session.votes ? [...session.votes] : [];
      votes = votes.filter((vote) => vote === index);

      setSumary(votes);
    }
  }, [session]);
  return (
    <div>
      <h1>
        {option} has {sumary?.length} votes
      </h1>
    </div>
  );
}

export default ResultItem;
