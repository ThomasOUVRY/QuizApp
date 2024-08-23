import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ResultScreen from "./components/ResultScreen.tsx";
import { QuizDataContextProvider } from "./context/QuizData.context.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/results",
    element: <ResultScreen />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QuizDataContextProvider>
      <RouterProvider router={router} />
    </QuizDataContextProvider>
  </React.StrictMode>,
);
