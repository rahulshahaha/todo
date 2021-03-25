import EditSheet from "./components/EditSheet/EditSheet";
import { FbProvider } from './store/fbContext.js'
import Main from "./components/Main";
import ProjectEditSheet from "./components/leftBar/projectEdit/ProjectEditSheet";



function App() {
  return (
    <FbProvider>
      <div className="App">
        <Main />
        <ProjectEditSheet />
        <EditSheet />
      </div>
    </FbProvider>
  );
}

export default App;
