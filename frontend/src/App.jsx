import React, { useState} from "react";
import Navigation from "./components/Navigation/Navigation";
import Dashboard from "./components/Dashboard/Dashboard";
import Income from "./components/Income/Income";
import Expenses from "./components/Expenses/Expenses";
import Transactions from "./components/Transactions/Transactions";

function App() {
  const [active, setActive] = useState(1);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Transactions />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div
      className="h-screen bg-cover relative bg-[#212c3b]"
    >
      <div className="flex flex-col md:flex-row h-full p-4 space-y-5 md:space-y-0 md:space-x-5 ">
        <Navigation active={active} setActive={setActive} />
        <main className="flex-1 bg-[#1f2937]   rounded-2xl overflow-hidden border-[1.5px]">
          {displayData()}
        </main>
      </div>
    </div>
  );
}

export default App;
