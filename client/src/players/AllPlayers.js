import React, { Fragment, useEffect, useState } from "react";
import { fetchGraphQL } from "../common/utils";
import { A } from "hookrouter";

const AllPlayers = () => {
  const [players, setPlayers] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [sort, setSort] = useState("rating");
  const [sortDirection, setSortDirection] = useState("desc");

  useEffect(() => {
    (async () => {
      const query = `{
        playerTable(page:${page}, perPage:${perPage}, sort:"${sort}", sortDirection:"${sortDirection}") {
          id
          name
          rating
          played
          percent
        }
      }`;
      const data = await fetchGraphQL(query);
      setPlayers(data.playerTable);
    })();
  }, [page, perPage, sort, sortDirection]);

  const handleSort = (newSort) => {
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
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>Name</th>
            <th onClick={() => handleSort("rating")}>Rating</th>
            <th onClick={() => handleSort("percent")}>Percent</th>
            <th onClick={() => handleSort("played")}>Played</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td>
                <A href={`/players/${player.id}`}>{player.name}</A>
              </td>
              <td>{player.rating}</td>
              <td>{Math.round(1000 * player.percent) / 10}</td>
              <td>{player.played}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default AllPlayers;
