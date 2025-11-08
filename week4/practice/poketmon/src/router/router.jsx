import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import PockemonDetail from "../pages/pokemon-detail";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/pokemon/:name",
    Component: PockemonDetail,
  },
]);

export default router;
