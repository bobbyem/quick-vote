import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { ScrollPanel } from "primereact/scrollpanel";
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
      dispatch(createPoll({pollInfo}))
    }
  }

  return (
    <section className="page justify-content-between fadein">
      <h2 className="text-center h-full">{pollInfo.question}</h2>
      
      <ScrollPanel style={{maxHeight: "500px"}} className="p-0 custom-scroll pr-3">
        {options.length > 0 ? options.map((option, index) => { return (<Option key={index} title={option} votable={false} removable={true} index={index} />)}) :null}
      </ScrollPanel>

        <div className="flex flex-column gap-3 h-full justify-content-end">
        <InputText
          id="option"
          value={option}
          onChange={(e) => {
            setOption(e.target.value);
          }}
            className="text-center text-4xl font-bold"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAdd();
              }
            }}
            autoFocus={true}
          />
        <label htmlFor="option">{options.length < 2 ? "Please enter at least two options" : null}</label>
        <Button className="bg-pink-200" label="ADD" disabled={option.length === 0 ? true : false} onClick={handleAdd} />
        <Button className="bg-pink-200" label="CREATE POLL" onClick={handleCreate}/>
        </div>
      </section>
  );
}

export default PollOptions;
