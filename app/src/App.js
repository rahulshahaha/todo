import EditSheet from "./components/modals/EditSheet/EditSheet";
import { FbProvider } from './store/contexts/fbContext.js'
import Main from "./components/Main";
import ProjectEditSheet from "./components/modals/projectEdit/ProjectEditSheet";
import EscDetect from "./components/EscDetect";
import { FilterContextProvider } from "./store/contexts/filterContext";
import { ModalProvider } from "./store/contexts/modalContext";
import { DataContextProvider } from "./store/contexts/dataContext";
import { ItemsProvider } from "./store/contexts/itemsContext";
import { OneOffsProvider } from "./store/contexts/oneOffsContext";
import { ProjectsProvider } from "./store/contexts/projectsContext";
import { WeightsProvider } from "./store/contexts/weightsContext";
import { HistoryProvider } from "./store/contexts/historyContext";
import { ConfigProvider } from "./store/contexts/configContext";
import DataHydrator from "./components/DataHydrator";



const App = () => {
  return (
    <FbProvider>
      <FilterContextProvider>
        <ModalProvider>
          <DataContextProvider>
            <ItemsProvider>
              <OneOffsProvider>
                <ProjectsProvider>
                  <WeightsProvider>
                    <HistoryProvider>
                      <ConfigProvider>
                      <DataHydrator />
                      <div className="App">
                        <Main />
                        <ProjectEditSheet />
                        <EditSheet />
                        <EscDetect />
                      </div>
                      </ConfigProvider>
                    </HistoryProvider>
                  </WeightsProvider>
                </ProjectsProvider>
              </OneOffsProvider>
            </ItemsProvider>
          </DataContextProvider>
        </ModalProvider>
      </FilterContextProvider>
    </FbProvider>
  );
}

export default App;
