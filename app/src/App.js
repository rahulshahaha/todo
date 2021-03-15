import Test from "./components/Test";
import { FbProvider } from './store/contexts/fbContext.js'

function App() {
  return (
    <FbProvider>
      <div className="App">
        <Test />
      </div>
    </FbProvider>
  );
}

export default App;
