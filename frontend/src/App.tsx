import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "/node_modules/primeflex/primeflex.css";
import "./custom.css";
import "primeicons/primeicons.css";
import { Route, Routes, useParams } from "react-router-dom";
import { PollOptions, PollSetup, Recipt, Result, Start, Vote } from "./pages";
import Header from "./components/Header";

function App() {
  return (
    <div className="flex flex-column min-h-screen max-h-screen justify-content-between">
      <Header />
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/pollsetup" element={<PollSetup />} />
        <Route path="/polloptions" element={<PollOptions />} />
        <Route path="/recipt" element={<Recipt />} />
        <Route path="/vote/:id" element={<Vote />} />
        <Route path="/result/:id" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;
