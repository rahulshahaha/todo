import AddItem from "./components/AddItem";
import Login from "./components/auth/Login";
import CardCollection from "./components/CardCollection";
import Config from "./components/todoConfig/Config";
import EditSheet from "./components/EditSheet/EditSheet";
import OneOffs from "./components/OneOffs/OneOffs";
import TotalScore from "./components/TotalScore";
import { FbProvider } from './store/fbContext.js'

function App() {
  return (
    <FbProvider>
      <div className="App">
        <Login />
        <TotalScore />
        <OneOffs />
        <CardCollection />
        <EditSheet />
        <AddItem />
        <Config />
      </div>
    </FbProvider>
  );
}

export default App;
