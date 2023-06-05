-- from the terminal run:
-- psql < air_traffic.sql

DROP DATABASE IF EXISTS air_traffic;

CREATE DATABASE air_traffic;

\c air_traffic

CREATE TABLE tickets
(
  ticket_id SERIAL PRIMARY KEY,
  airline_id INTEGER,
  flight_id INTEGER,
  seat TEXT,
  passenger_id INTEGER,
  departure_airport_id INTEGER,
  departure_datetime TIMESTAMP,
  arrival_airport_id INTEGER,
  arrival_datetime TIMESTAMP
);

CREATE TABLE flights
(
  flight_id SERIAL PRIMARY KEY,
  airline_id INTEGER NOT NULL,
  departure_airport_id INTEGER,
  departure_datetime TIMESTAMP,
  departure_status TEXT,
  arrival_airport_id INTEGER,
  arrival_datetime TIMESTAMP,
  arrival_status TEXT
);

CREATE TABLE passengers
(
  passenger_id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL
);

CREATE TABLE airports
(
  airport_id SERIAL PRIMARY KEY,
  city TEXT NOT NULL,
  country TEXT NOT NULL
);

CREATE TABLE airlines
(
  airline_id SERIAL PRIMARY KEY,
  airline_name TEXT NOT NULL
);

CREATE TABLE tickets_tmp
(
  first_name TEXT,
  last_name TEXT,
  seat TEXT,
  departure TIMESTAMP,
  arrival TIMESTAMP,
  airline TEXT,
  from_city TEXT,
  from_country TEXT,
  to_city TEXT,
  to_country TEXT
);


INSERT INTO tickets_tmp
  (first_name, last_name, seat, departure, arrival, airline, from_city, from_country, to_city, to_country)
VALUES
  ('Jennifer', 'Finch', '33B', '2018-04-08 09:00:00', '2018-04-08 12:00:00', 'United', 'Washington DC', 'United States', 'Seattle', 'United States'),
  ('Thadeus', 'Gathercoal', '8A', '2018-12-19 12:45:00', '2018-12-19 16:15:00', 'British Airways', 'Tokyo', 'Japan', 'London', 'United Kingdom'),
  ('Sonja', 'Pauley', '12F', '2018-01-02 07:00:00', '2018-01-02 08:03:00', 'Delta', 'Los Angeles', 'United States', 'Las Vegas', 'United States'),
  ('Jennifer', 'Finch', '20A', '2018-04-15 16:50:00', '2018-04-15 21:00:00', 'Delta', 'Seattle', 'United States', 'Mexico City', 'Mexico'),
  ('Waneta', 'Skeleton', '23D', '2018-08-01 18:30:00', '2018-08-01 21:50:00', 'TUI Fly Belgium', 'Paris', 'France', 'Casablanca', 'Morocco'),
  ('Thadeus', 'Gathercoal', '18C', '2018-10-31 01:15:00', '2018-10-31 12:55:00', 'Air China', 'Dubai', 'UAE', 'Beijing', 'China'),
  ('Berkie', 'Wycliff', '9E', '2019-02-06 06:00:00', '2019-02-06 07:47:00', 'United', 'New York', 'United States', 'Charlotte', 'United States'),
  ('Alvin', 'Leathes', '1A', '2018-12-22 14:42:00', '2018-12-22 15:56:00', 'American Airlines', 'Cedar Rapids', 'United States', 'Chicago', 'United States'),
  ('Berkie', 'Wycliff', '32B', '2019-02-06 16:28:00', '2019-02-06 19:18:00', 'American Airlines', 'Charlotte', 'United States', 'New Orleans', 'United States'),
  ('Cory', 'Squibbes', '10D', '2019-01-20 19:30:00', '2019-01-20 22:45:00', 'Avianca Brasil', 'Sao Paolo', 'Brazil', 'Santiago', 'Chile');

-- denormalize the single table into their own tables
-- more can be done to index and relate the tables

-- drop table tickets;
-- drop table flights;
-- drop table passengers;
-- drop table airports;
-- drop table airlines;
-- drop table tickets_tmp;

insert into airlines
  (airline_name)
select distinct airline 
from tickets_tmp;

insert into airports
  (city, country)
select distinct from_city, from_country 
from tickets_tmp;

insert into airports
  (city, country)
select distinct to_city, to_country 
from tickets_tmp
where concat(to_city, to_country) not in
(select concat(city, country) from airports);

insert into passengers
  (first_name, last_name)
select distinct first_name, last_name 
from tickets_tmp;

insert into flights
  (airline_id, departure_airport_id, arrival_airport_id, departure_datetime, arrival_datetime)
select distinct airline_id, a0.airport_id as departure_airport_id, a1.airport_id as arrival_airport_id, t.departure as departure_datetime, t.arrival as arrival_datetime
from (((tickets_tmp as t 
inner join airlines as c
  on t.airline = c.airline_name) 
inner join airports as a0
  on t.from_city = a0.city
  and t.from_country = a0.country)
inner join airports as a1
  on t.to_city = a1.city
  and t.to_country = a1.country);

insert into tickets
  (airline_id, flight_id, seat, passenger_id, departure_airport_id, arrival_airport_id, departure_datetime, arrival_datetime)
select distinct f.airline_id, f.flight_id, seat, p.passenger_id, a0.airport_id as departure_airport_id, a1.airport_id as arrival_airport_id, t.departure as departure_datetime, t.arrival as arrival_datetime
from (((((tickets_tmp as t 
inner join airlines as c
  on t.airline = c.airline_name) 
inner join airports as a0
  on t.from_city = a0.city
  and t.from_country = a0.country)
inner join airports as a1
  on t.to_city = a1.city
  and t.to_country = a1.country)
inner join flights as f
  on f.airline_id = c.airline_id
  and f.departure_airport_id = a0.airport_id
  and f.arrival_airport_id = a1.airport_id
  and f.departure_datetime = t.departure)
inner join passengers as p
  on t.first_name = p.first_name
  and t.last_name = p.last_name);

