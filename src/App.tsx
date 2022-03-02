import "./App.css";
import HeadAfter from "./Components/common/Header/After";
import HeadBefore from "./Components/common/Header/Before";
import Chat from "./Components/pages/Chat";
import TimeTablePage from "./Components/pages/Schedules/TimeTable";
import Login from "./Components/common/Login/Login";
import { RecoilRoot } from "recoil";
import Cafeteria from "./Components/common/Cafeteria/Cafeteria";

function App() {
  return (
    <RecoilRoot>
      <div id="AppWrapper">
        <Cafeteria />
      </div>
    </RecoilRoot>
  );
}

export default App;
