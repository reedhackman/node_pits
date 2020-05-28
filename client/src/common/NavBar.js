import React from "react";
import { A } from "hookrouter";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="NavBar">
      <div className="NavBar-content">
        <div className="NavBar-left">
          <A href="/">AGOT Fighting Pits</A>
        </div>
        <div className="NavBar-right">
          <A href="/players">Players</A>
          <A href="/decks">Decks</A>
          <A href="/login">Log In</A>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
