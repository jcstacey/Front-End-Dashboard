import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import DashboardOverview from "./views/DashboardOverview";
import DeviceOne from "./views/DeviceOne";
import DeviceTwo from "./views/DeviceTwo";
import DeviceThree from "./views/DeviceThree";
import UserProfileLite from "./views/UserProfileLite";
import Errors from "./views/Errors";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/main" />
  },
  {
    path: "/main",
    layout: DefaultLayout,
    component: DashboardOverview
  },
  {
    path: "/device-one*",
    layout: DefaultLayout,
    component: DeviceOne
  },  
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/user*",
    layout: DefaultLayout,
    component: UserProfileLite
  },
  {
    path: "/device-two",
    layout: DefaultLayout,
    component: DeviceTwo
  },
  {
    path: "/device-three",
    layout: DefaultLayout,
    component: DeviceThree
  }
];
