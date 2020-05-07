import React from "react";
import { A } from "hookrouter";

const NavBar = () => {
  return (
    <div className="NavBar">
      <div className="NavBar-left">
        <A href="/">AGOT Fighting Pits</A>
      </div>
      <div className="NavBar-right">
        <A href="/players">Players</A>
        <A href="/decks">Decks</A>
      </div>
    </div>
  );
};

export default NavBar;
