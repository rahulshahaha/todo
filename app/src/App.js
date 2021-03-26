import EditSheet from "./components/modals/EditSheet/EditSheet";
import { FbProvider } from './store/contexts/fbContext.js'
import Main from "./components/Main";
import ProjectEditSheet from "./components/modals/projectEdit/ProjectEditSheet";
import EscDetect from "./components/EscDetect";
import { FilterContextProvider } from "./store/contexts/filterContext";
import { ModalProvider } from "./store/contexts/modalContext";



function App() {
  return (
    <FbProvider>
      <FilterContextProvider>
        <ModalProvider>
          <div className="App">
            <Main />
            <ProjectEditSheet />
            <EditSheet />
            <EscDetect />
          </div>
        </ModalProvider>
      </FilterContextProvider>
    </FbProvider>
  );
}

export default App;
