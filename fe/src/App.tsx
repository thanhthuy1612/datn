import React from "react";
import { privateRoutes, publicRoutes } from "./routers";
import { IRouter } from "./interfaces/IRouter";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import "./App.css";

const routers = () => {
  return [...publicRoutes, ...privateRoutes];
};
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {routers().map((route: IRouter) => {
          const Layout = route.layout || DefaultLayout;
          const Page = route.component;
          return (
            <Route
              key={route.id}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
};

export default App;
