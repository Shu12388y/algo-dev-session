import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import QueryProvider from "./providers/query-provider.tsx";
import { auth_store } from "./store/auth.store.ts";
import {Provider} from "react-redux"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={auth_store}>
      <QueryProvider>
        <App />
      </QueryProvider>
    </Provider>
    </BrowserRouter>
  </StrictMode>,
);
