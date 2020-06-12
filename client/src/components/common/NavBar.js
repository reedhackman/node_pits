import React from "react";
import { A } from "hookrouter";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="NavBar">
      <div className="NavBar-content">
        <div className="NavBar-left">
          <A href="/" className="NavBar-home">
            AGOT Fighting Pits
          </A>
        </div>
        <div className="NavBar-right">
          <A href="/players" className="NavBar-link">
            Players
          </A>
          <A href="/decks" className="NavBar-link">
            Decks
          </A>
          <A href="/login" className="NavBar-link">
            Log In
          </A>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
