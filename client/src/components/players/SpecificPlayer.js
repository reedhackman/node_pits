import React, { Fragment, useEffect, useState } from "react";
import { A } from "hookrouter";
import { fetchGraphQL } from "../common/utils";

const SpecificPlayer = ({ id }) => {
  const [player, setPlayer] = useState({});
  useEffect(() => {
    (async () => {
      const query = `{
        player(id:${id}) {
          id
          name
          rating
          played
          percent
        }
      }`;
      const data = await fetchGraphQL(query);
      setPlayer(data.player);
    })();
  }, []);
  return <Fragment></Fragment>;
};

export default SpecificPlayer;
