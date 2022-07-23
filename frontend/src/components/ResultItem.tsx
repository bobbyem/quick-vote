import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../features/store";

interface ResultItemProps {
  option: string;
  index: number;
  total: number;
}

function ResultItem(props: ResultItemProps) {
  const { option, index, total } = props;
  const [sumary, setSumary] = useState(0);
  const { session } = useSelector(
    (state: RootState) => state.reducers.sessionReducer
  );

  //UseEffects
  useEffect(() => {
    if (session) {
      let votes = session.votes ? [...session.votes] : [];
      votes = votes.filter((vote) => vote === index);

      setSumary(votes.length);
    }
  }, [session]);

  if (session) {
    const percentage =
      total && sumary !== 0 ? Math.floor((sumary / total) * 100) : 0;
    return (
      <div className="relative">
        <h4 className="z-1">
          <span className="capitalize">{option} ||</span> has {sumary} votes{" "}
          {percentage}%
        </h4>
        <div className="h-full w-full bg-orange-400 absolute z-0" />
      </div>
    );
  }

  return null;
}

export default ResultItem;
