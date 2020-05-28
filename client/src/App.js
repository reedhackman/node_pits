import React, { Fragment } from "react";
import { useRoutes } from "hookrouter";
import NavBar from "./common/NavBar";
import AllPlayers from "./players/AllPlayers";
import SpecificPlayer from "./players/SpecificPlayer";
import Home from "./misc/Home";
import AllDecks from "./decks/AllDecks";
import SpecificDeck from "./decks/SpecificDeck";
import "./App.css";

const App = () => {
  const routes = {
    "/players": () => <AllPlayers />,
    "/players/:id": ({ id }) => <SpecificPlayer id={id} />,
    "/decks": () => <AllDecks />,
    "/decks/:faction/:agenda": ({ faction, agenda }) => (
      <SpecificDeck faction={faction} agenda={agenda} />
    ),
    "/decks/The%20Free%20Folk": () => (
      <SpecificDeck faction={null} agenda={"The Free Folk"} />
    ),
    "/decks/:faction": ({ faction }) => <div>{faction}</div>,
    "/login": () => <div>login</div>,
    "/signup": () => <div>signup</div>,
    "/": () => <Home />,
    "*": () => <div>ERROR</div>,
  };
  const routeResult = useRoutes(routes);
  return (
    <Fragment>
      <header>
        <NavBar />
      </header>
      <main>
        <div className="content">{routeResult}</div>
      </main>
      <footer></footer>
    </Fragment>
  );
};

export default App;
