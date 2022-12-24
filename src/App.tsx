import { RouterProvider } from "react-router-dom";
import Spinner from "./components/Spinner";
import router from "./router/router";

const App = () => {
  return <RouterProvider router={router} fallbackElement={<Spinner />} />;
};

export default App;
