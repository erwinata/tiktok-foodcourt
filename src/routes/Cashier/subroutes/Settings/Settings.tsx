import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Switch, Route } from "react-router-dom";
import Main from "routes/Cashier/subroutes/Settings/Main/Main";
import Profile from "routes/Cashier/subroutes/Settings/Profile/Profile";

const Settings = () => {
  return (
    <Switch>
      <Route path="/cashier/settings/profile" component={Profile} />
      <Route path="/cashier/settings/" component={Main} />
    </Switch>
  );
};

export default Settings;
