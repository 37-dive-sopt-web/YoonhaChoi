import Header from "./components/header";
import GameBoard from "./components/game-border-section/game-board";
import LevelSection from "./components/level-section/level-section";
function App() {
  return (
    <div className="min-h-screen bg-green-50 p-6">
      <Header />
      <div className="flex justify-between rounded-2xl bg-green-100 p-6">
        <GameBoard />
        <LevelSection />
      </div>
    </div>
  );
}

export default App;
