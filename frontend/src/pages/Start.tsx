import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

function Start() {
  const navigate = useNavigate();

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
