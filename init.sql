DROP TABLE position;
DROP TABLE decks;
DROP TABLE players;
DROP TABLE complete;
DROP TABLE incomplete;

CREATE TABLE position (
  page integer NOT NULL,
  index integer NOT NULL
);

INSERT INTO position (page, index) VALUES (1, 0);

CREATE TABLE decks (
  faction text,
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
  winner_id integer,
  loser_id integer,
  winner_faction text,
  winner_agenda text,
  loser_faction text,
  loser_agenda text
);

CREATE TABLE incomplete (
  id integer NOT NULL,
  tournament_id integer NOT NULL
);

ALTER TABLE complete ADD COLUMN winner_rating float NOT NULL;
ALTER TABLE complete ADD COLUMN loser_rating float NOT NULL;

ALTER TABLE players ADD COLUMN percent float;
ALTER TABLE players ADD COLUMN played integer;
UPDATE players SET played = wins + losses;
UPDATE players SET percent = cast(wins as decimal) / played;
ALTER TABLE players ALTER COLUMN percent SET NOT NULL;
ALTER TABLE players ALTER COLUMN played SET NOT NULL;

ALTER TABLE decks ADD COLUMN percent float;
ALTER TABLE decks ADD COLUMN played integer;
UPDATE decks SET played = wins + losses;
UPDATE decks SET percent = cast(wins as decimal) / played;
ALTER TABLE decks ALTER COLUMN percent SET NOT NULL;
ALTER TABLE decks ALTER COLUMN played SET NOT NULL;

ALTER TABLE players ADD COLUMN opponents integer[];
