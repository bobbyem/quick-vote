import { PrimeIcons } from "primereact/api";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVote } from "../features/slices/appSlice";
import { RootState } from "../features/store";

interface OptionProps {
  title: string;
  votable: boolean;
  removable: boolean;
  index: number;
}

function Option(props: OptionProps) {
  const { title, votable, removable, index } = props;
  const { vote } = useSelector((state: RootState) => state.reducers.appReducer);
  const dispatch = useDispatch();
  return (
    <div className="flex justify-content-between border-1 mb-1 pr-2 pl-2">
      <h4 className="capitalize">{title}</h4>
      {removable ? <i className="pi pi-trash flex align-items-center" /> : null}
      {votable ? (
        <input
          className="cursor-pointer"
          type="radio"
          checked={index === vote ? true : false}
          onChange={() => {
            dispatch(setVote(index));
          }}
        />
      ) : null}
    </div>
  );
}

export default Option;
