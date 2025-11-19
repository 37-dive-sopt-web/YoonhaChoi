import { RouterProvider } from "react-router";
import router from "./router/router";
import "./App.css";
import ThemeProvider from "./styles/theme-provider";

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
