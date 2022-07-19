import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Start() {
  const [pollId, setPollId] = useState("");
  const navigate = useNavigate();

  return (
    <section className="flex flex-column h-full justify-content-between">
      <div className="flex flex-column gap-3 pb-6 p-2">
        <InputText
          id="pollId"
          value={pollId}
          onChange={(e) => {
            setPollId(e.target.value);
          }}
          className="text-center text-6xl font-bold"
        />
        <label htmlFor="pollId">Please enter Poll number</label>
      </div>
      <div className="flex flex-column gap-3 p-2">
        <Button label="OPEN POLL" disabled={pollId.length < 8 ? true : false} />
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
