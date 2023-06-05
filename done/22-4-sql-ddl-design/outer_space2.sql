-- from the terminal run:
-- psql < outer_space.sql

DROP DATABASE IF EXISTS outer_space;

CREATE DATABASE outer_space;

\c outer_space

create table entities
(
  entity_id SERIAL PRIMARY KEY,
  entity_name TEXT NOT NULL,
  entity_type TEXT NOT NULL
);

CREATE TABLE orbits
(
  orbited_entity_id INTEGER NOT NULL,
  orbiting_entity_id INTEGER NOT NULL,
  period_in_years FLOAT
);

CREATE TABLE planets_tmp
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  orbital_period_in_years FLOAT NOT NULL,
  orbits_around TEXT NOT NULL,
  galaxy TEXT NOT NULL,
  moons TEXT[]
);

-- drop table entities;
-- drop table orbits;
-- drop table planets_tmp;

INSERT INTO planets_tmp
  (name, orbital_period_in_years, orbits_around, galaxy, moons)
VALUES
  ('Earth', 1.00, 'The Sun', 'Milky Way', '{"The Moon"}'),
  ('Mars', 1.88, 'The Sun', 'Milky Way', '{"Phobos", "Deimos"}'),
  ('Venus', 0.62, 'The Sun', 'Milky Way', '{}'),
  ('Neptune', 164.8, 'The Sun', 'Milky Way', '{"Naiad", "Thalassa", "Despina", "Galatea", "Larissa", "S/2004 N 1", "Proteus", "Triton", "Nereid", "Halimede", "Sao", "Laomedeia", "Psamathe", "Neso"}'),
  ('Proxima Centauri b', 0.03, 'Proxima Centauri', 'Milky Way', '{}'),
  ('Gliese 876 b', 0.23, 'Gliese 876', 'Milky Way', '{}');

insert into entities
  (entity_name, entity_type)
select distinct galaxy as entity_name, 'galaxy' from planets_tmp;

insert into entities
  (entity_name, entity_type)
select distinct orbits_around as entity_name, 'star' as entity_type from planets_tmp;

insert into orbits
  (orbited_entity_id, orbiting_entity_id)
select distinct 
  d.entity_id as orbited_entity_id,  
  e.entity_id as orbiting_entity_id   
from (planets_tmp as p
inner join entities as d
on p.galaxy = d.entity_name)          -- galaxy
inner join entities as e
on p.orbits_around = e.entity_name;   -- star

insert into entities
  (entity_name, entity_type)
select distinct p.name as entity_name, 'planet' as entity_type from planets_tmp as p;

insert into orbits
  (orbited_entity_id, orbiting_entity_id, period_in_years)
select distinct 
  d.entity_id as orbited_entity_id,   
  e.entity_id as orbiting_entity_id, 
  p.orbital_period_in_years as period_in_years
from (planets_tmp as p
inner join entities as d              
on p.orbits_around = d.entity_name)   -- star
inner join entities as e              
on p.name = e.entity_name;            -- planet

insert into entities
  (entity_name, entity_type)
select distinct unnest(moons) as entity_name, 'moon' as entity_type from planets_tmp as p;

insert into orbits
  (orbited_entity_id, orbiting_entity_id)
select distinct 
  d.entity_id as orbited_entity_id,   
  e.entity_id as orbiting_entity_id   
from ((select name as planet, unnest(moons) as moon from planets_tmp) as p
inner join entities as d              
on p.planet = d.entity_name)          -- planet
inner join entities as e              
on p.moon = e.entity_name;            -- moon

