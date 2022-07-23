import { Button } from "primereact/button";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../features/slices/sessionSlice";
import { AppDispatch } from "../features/store";

function Start() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  //useEffects
  useEffect(() => {
    dispatch(reset());
  }, []);
  return (
    <section className="flex flex-column h-full justify-content-between">
      <div className="flex flex-column gap-3 pb-6 p-2"></div>
      <div className="flex flex-column gap-3 p-2">
        <Button
          label="CREATE POLL"
          onClick={() => {
            navigate("/pollsetup");
          }}
        />
      </div>
    </section>
  );
}

export default Start;
