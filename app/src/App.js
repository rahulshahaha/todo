import CardCollection from "./components/CardCollection";
import EditSheet from "./components/EditSheet/EditSheet";
import { FbProvider } from './store/fbContext.js'
import LeftBar from "./components/LeftBar";
import RightBar from "./components/rightBar/RightBar";


function App() {
  return (
    <FbProvider>
      <div className="App">
        <div className="grid grid-cols-12">
          <LeftBar />
          <CardCollection />
          <RightBar />
        </div>
        <EditSheet />
      </div>
    </FbProvider>
  );
}

export default App;
