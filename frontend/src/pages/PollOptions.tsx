import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Option from "../components/Option";
import { addOption, reset } from "../features/slices/appSlice";
import { createPoll } from "../features/slices/sessionSlice";
import { AppDispatch, RootState } from "../features/store";

function PollOptions() {
  const [options, setOptions] = useState(Array<string>);
  const [option, setOption] = useState("");
  const optionInput = useRef<HTMLInputElement>(null);
  const { pollInfo, creator } = useSelector(
    (state: RootState) => state.reducers.appReducer
  );
  const { session } = useSelector((state: RootState) => state.reducers.sessionReducer);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!creator.email || !pollInfo.question) {
      navigate("/")
    }
    if (pollInfo.options) {
      setOptions(pollInfo.options);
    }
  }, [pollInfo, creator]);

  useEffect(() => {
    if (session) {
      //Navigate to recipt
      navigate("/recipt")
    }
  },[session])

  function handleAdd(): void {
    if (options.includes(option)) {
      //Clear if duplication
      setOption("");
      return
    }
    dispatch(addOption(option.toLocaleLowerCase()));
    //Clear input
    setOption("");
  }

  function handleCreate(): void{
    if (pollInfo.options && pollInfo.question.length > 1 && pollInfo.question && creator) {
      dispatch(createPoll({creator,pollInfo}))
    }
  }

  return (
    <>
      <h2 className="text-center">{pollInfo.question}</h2>
      <section className="overflow-y-scroll mr-4 ml-4">
        {options.length > 0 ? options.map((option, index) => { return (<Option key={index} title={option} votable={false} removable={true} index={index} />)}) :null}
      </section>
    <section className="flex flex-column h-full justify-content-between">
      <div className="flex flex-column gap-3 pb-6 p-2">
        <InputText
          id="option"
          value={option}
          onChange={(e) => {
            setOption(e.target.value);
          }}
            className="text-center text-6xl font-bold"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAdd();
              }
            }}
            autoFocus={true}
          />
        <label htmlFor="option">{options.length < 2 ? "Please enter at least two options" : null}</label>
      </div>
      <div className="flex flex-column gap-3 p-2">
        <Button label="ADD" disabled={option.length === 0 ? true : false} onClick={handleAdd} />
        <Button label="CREATE POLL" onClick={handleCreate}/>
        </div>
      </section>
          </>
  );
}

export default PollOptions;
