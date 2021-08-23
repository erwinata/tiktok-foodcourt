import React, { useEffect } from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import HomePage from "routes/Home";
import TenantPage from "routes/Tenant";
import CashierPage from "routes/Cashier";
import LoginPage from "routes/Login";
import InstallPage from "routes/Install";
import useUserContext from "context/useUserContext";
import { getCookie } from "helpers/cookie";
import { isPWA } from "helpers/pwa";
import { isLocalEnv } from "helpers/env";

const Routes = () => {
  const { userState } = useUserContext();
  const history = useHistory();

  useEffect(() => {
    if (!isPWA() && !isLocalEnv()) {
      history.replace("/install");
      return;
    }
    if (!userState.user) {
      history.replace("/login");
      return;
    }
  }, [history, userState.user]);

  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/install" component={InstallPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/tenant" component={TenantPage} />
      <Route path="/cashier" component={CashierPage} />
    </Switch>
  );
};

export default Routes;
