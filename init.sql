CREATE TABLE position (
  page integer NOT NULL,
  index integer NOT NULL
)

INSERT INTO position (page, index) VALUES (1, 0)

CREATE TABLE players (
  id integer NOT NULL,
  name text NOT NULL,
  rating float NOT NULL,
  wins integer NOT NULL,
  losses integer NOT NULL
)
