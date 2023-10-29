import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/globals.css";
import { store } from "@/store";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import AuthMiddleware from "@/helpers/authMiddleware";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <BrowserRouter>
        <CookiesProvider>
          <AuthMiddleware>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </AuthMiddleware>
        </CookiesProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
