import Header from "./components/header";
import { useTabControl } from "./hooks/use-tab-control";

function App() {
  const { activeTab, handleTab, renderContent } = useTabControl("게임");

  return (
    <div className="flex min-h-screen flex-col bg-green-50 p-6">
      <Header activeTab={activeTab} handleTab={handleTab} />

      <div className="mt-5 flex-1 overflow-y-auto rounded-2xl bg-green-100">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
