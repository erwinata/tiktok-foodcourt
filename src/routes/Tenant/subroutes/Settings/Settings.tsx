import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "routes/Tenant/subroutes/Settings/Main/Main";
import Profile from "routes/Tenant/subroutes/Settings/Profile/Profile";

const Settings = () => {
  return (
    <Switch>
      <Route path="/tenant/settings/profile" component={Profile} />
      <Route path="/tenant/settings/" component={Main} />
    </Switch>
  );
};

export default Settings;
