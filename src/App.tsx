import Portals from "components/Portals";
import { UserProvider } from "context/UserContext";
import { ModalProvider } from "context/ModalContext";
import { ThemeProvider } from "context/ThemeContext";
import React from "react";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import { isLocalEnv } from "helpers/env";

function App() {
  let basename = "/foodcourt";
  if (isLocalEnv()) {
    basename = "/";
  }

  return (
    <div>
      <UserProvider>
        <ThemeProvider>
          <ModalProvider>
            <Portals />
            <BrowserRouter basename={basename}>
              <Routes />
            </BrowserRouter>
          </ModalProvider>
        </ThemeProvider>
      </UserProvider>
    </div>
  );
}

export default App;
