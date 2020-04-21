CREATE TABLE position (
  page integer NOT NULL,
  index integer NOT NULL
);

INSERT INTO position (page, index) VALUES (1, 0);

CREATE TABLE decks (
  faction text NOT NULL,
  agenda text,
  wins integer NOT NULL,
  losses integer NOT NULL
);

CREATE TABLE players (
  id integer NOT NULL,
  name text NOT NULL,
  rating float NOT NULL,
  wins integer NOT NULL,
  losses integer NOT NULL
);

CREATE TABLE complete (
  id integer NOT NULL,
  tournament_id integer NOT NULL,
  tournament_date date NOT NULL,
  winner_id integer NOT NULL,
  loser_id integer NOT NULL
);

CREATE TABLE incomplete (
  id integer NOT NULL,
  tournament_id integer NOT NULL
);

ALTER TABLE complete ADD COLUMN winner_rating float NOT NULL;
ALTER TABLE complete ADD COLUMN loser_rating float NOT NULL;
