import CardCollection from "./components/CardCollection";
import EditSheet from "./components/EditSheet/EditSheet";
import { FbProvider } from './store/fbContext.js'
import TopView from "./components/TopView";

function App() {
  return (
    <FbProvider>
      <div className="App">
        <div className="grid grid-cols-12">
          <TopView />
          <CardCollection />
        </div>
        <EditSheet />
      </div>
    </FbProvider>
  );
}

export default App;
