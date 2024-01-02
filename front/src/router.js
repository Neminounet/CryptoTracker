import { createHashRouter, redirect } from "react-router-dom";
import { lazy } from "react";
import App from "./App";

const Homepage = lazy(() => import("./pages/Homepage/Homepage"));

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
    ],
  },
]);

export { router };
