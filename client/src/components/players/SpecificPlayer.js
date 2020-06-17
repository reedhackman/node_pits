import React, { Fragment, useEffect, useState } from "react";
import { A } from "hookrouter";
import { fetchGraphQL } from "../common/utils";

const SpecificPlayer = ({ id }) => {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    (async () => {
      const query = `{
        player(id:${id}) {
          id
          name
          rating
          played
          percent
          games {
            winner_name
            loser_name
            winner_id
            loser_id
          }
        }
      }`;
      const data = await fetchGraphQL(query);
      setPlayer(data.player);
    })();
  }, []);
  return (
    <Fragment>
      {player ? (
        <div>
          <BasicStats player={player} />
          <OpponentsComponent player={player} />
        </div>
      ) : null}
    </Fragment>
  );
};

const BasicStats = ({ player }) => (
  <div>
    <div>Name: {player.name}</div>
    <div>Rating: {player.rating}</div>
    <div>Played: {player.played}</div>
    <div>Percent: {Math.round(1000 * player.percent) / 10}</div>
  </div>
);

const OpponentsComponent = ({ player }) => {
  const [opponents, setOpponents] = useState([]);
  useEffect(() => {
    let opponents = {};
    player.games.forEach(game => {
      if (player.name === game.winner_name) {
        if (!opponents[game.loser_id]) {
          opponents[game.loser_id] = {
            name: game.loser_name,
            wins: 0,
            losses: 0
          };
        }
        opponents[game.loser_id].wins++;
      } else {
        if (!opponents[game.winner_id]) {
          opponents[game.winner_id] = {
            name: game.winner_name,
            wins: 0,
            losses: 0
          };
        }
        opponents[game.winner_id].losses++;
      }
    });
    opponents = Object.keys(opponents).map(id => {
      return {
        name: opponents[id].name,
        wins: opponents[id].wins,
        losses: opponents[id].losses
      };
    });
    setOpponents[opponents];
  }, [player]);
  return (
    <div>
      <div>{opponents.length}</div>
    </div>
  );
};

export default SpecificPlayer;
