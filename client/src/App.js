import React, { Fragment, useState, useEffect } from "react";
import { useRoutes } from "hookrouter";
// import logo from "./logo.svg";
import "./App.css";

const App = () => {
  // const [state, setState] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     const res = await fetch(url);
  //     const data = await res.json();
  //   })();
  // }, []);

  const routes = {
    "/players*": () => <Players />,
    "/decks/*": () => <div>decks</div>,
    "/": () => <div>slash</div>,
    "/*": () => <div>error</div>
  };

  const routeResult = useRoutes(routes);

  return <Fragment>{routeResult}</Fragment>;
};

const Players = () => {
  const routes = {
    "/": () => <div>all players</div>,
    "/:id": ({ id }) => <div>{id}</div>,
    "/*": () => <div>error</div>
  };

  const routeResult = useRoutes(routes);

  return <Fragment>{routeResult}</Fragment>;
};

export default App;
