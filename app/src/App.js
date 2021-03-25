import EditSheet from "./components/modals/EditSheet/EditSheet";
import { FbProvider } from './store/fbContext.js'
import Main from "./components/Main";
import ProjectEditSheet from "./components/modals/projectEdit/ProjectEditSheet";
import EscDetect from "./components/EscDetect";



function App() {
  return (
    <FbProvider>
      <div className="App">
        <Main />
        <ProjectEditSheet />
        <EditSheet />
        <EscDetect />
      </div>
    </FbProvider>
  );
}

export default App;
