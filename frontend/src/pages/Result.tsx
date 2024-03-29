import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ResultDisplay from "../components/ResultDisplay";
import { fetchPollById } from "../features/slices/sessionSlice";
import { AppDispatch } from "../features/store";

function Result() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (id) {
      const interval = setInterval(() => {
        dispatch(fetchPollById(id));
      }, 5000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [id]);
  return (
    <div className="page justify-content-center fadein">
      {<ResultDisplay />}
    </div>
  );
}

export default Result;
