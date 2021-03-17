import AddItem from "./components/AddItem";
import Login from "./components/auth/Login";
import OneOffs from "./components/OneOffs/OneOffs";
import Table from "./components/Table";
import TotalScore from "./components/TotalScore";
import { FbProvider } from './store/fbContext.js'

function App() {
  return (
    <FbProvider>
      <div className="App">
        <Login />
        <TotalScore />
        <OneOffs />
        <Table />
        <AddItem />
      </div>
    </FbProvider>
  );
}

export default App;
