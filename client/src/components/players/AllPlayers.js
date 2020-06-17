import React, { Fragment, useEffect, useState } from "react";
import { fetchGraphQL } from "../common/utils";
import { A } from "hookrouter";
import "./AllPlayers.css";

const AllPlayers = () => {
  const [players, setPlayers] = useState([]);
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(1);
  const [numPlayers, setNumPlayers] = useState(0);
  const [perPage, setPerPage] = useState(20);
  const [sort, setSort] = useState("rating");
  const [sortDirection, setSortDirection] = useState("desc");

  useEffect(() => {
    (async () => {
      const query = `{
        numPlayers
      }`;
      const data = await fetchGraphQL(query);
      setNumPlayers(data.numPlayers);
      setNumPages(Math.ceil(data.numPlayers / perPage));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const query = `{
        playerTable(page:${page}, perPage:${perPage}, sort:"${sort}", sortDirection:"${sortDirection}") {
          id
          name
          rating
          played
          percent
          opponents
        }
      }`;
      const data = await fetchGraphQL(query);
      setPlayers(data.playerTable);
    })();
  }, [page, perPage, sort, sortDirection]);

  useEffect(() => {
    setNumPages(Math.ceil(numPlayers / perPage));
  }, [perPage]);

  const handlePage = action => {
    if (action === "first") {
      setPage(1);
    } else if (action === "last") {
      setPage(numPages);
    } else if (action === "prev") {
      setPage(page - 1);
    } else {
      setPage(page + 1);
    }
  };

  const handleSort = newSort => {
    if (newSort === sort) {
      if (sortDirection === "asc") setSortDirection("desc");
      else setSortDirection("asc");
    } else {
      setSort(newSort);
      if (newSort === "name") setSortDirection("asc");
      else setSortDirection("desc");
    }
  };

  return (
    <Fragment>
      <table className="table">
        <thead>
          <tr className="row">
            <th onClick={() => handleSort("name")} className="name">
              Name
            </th>
            <th onClick={() => handleSort("rating")} className="rating">
              Rating
            </th>
            <th onClick={() => handleSort("percent")} className="percent">
              Percent
            </th>
            <th onClick={() => handleSort("played")} className="played">
              Played
            </th>
            <th onClick={() => handleSort("opponents")} className="opponents">
              Opponents
            </th>
          </tr>
        </thead>
        <tbody>
          {players.map(player => (
            <tr key={player.id} className="row">
              <td className="name">
                <A href={`/players/${player.id}`}>{player.name}</A>
              </td>
              <td className="rating">{player.rating}</td>
              <td className="percent">
                {Math.round(1000 * player.percent) / 10}
              </td>
              <td className="played">{player.played}</td>
              <td className="opponents">{player.opponents.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <div onClick={() => handlePage("first")}>first</div>
        <div onClick={() => handlePage("prev")}>prev</div>
        <div>
          {page} of {numPages}
        </div>
        <div onClick={() => handlePage("next")}>next</div>
        <div onClick={() => handlePage("last")}>last</div>
      </div>
    </Fragment>
  );
};

export default AllPlayers;
