import { Button } from "primereact/button";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
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
    <section className="page justify-content-end fadein">
      <h2 className=" flex  justify-content-center  align-content-center align-items-center h-full">
        Polls made quick and easy!
      </h2>
      <div className="flex flex-column gap-3 p-2">
        <Button
          icon="pi pi-align-right"
          className="bg-pink-200"
          label="CREATE A POLL"
          onClick={() => {
            navigate("/pollsetup");
          }}
          autoFocus={true}
        />
      </div>
    </section>
  );
}

export default Start;
