import Header from "./components/header";
import GameBoard from "./components/game-border-section/game-board";

function App() {
  return (
    <div className="min-h-screen bg-green-50 p-6">
      <Header />
      <GameBoard />
    </div>
  );
}

export default App;
