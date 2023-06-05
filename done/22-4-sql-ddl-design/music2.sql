-- from the terminal run:
-- psql < music.sql

DROP DATABASE IF EXISTS music;

CREATE DATABASE music;

\c music

CREATE TABLE artists
(
  artist_id SERIAL PRIMARY KEY,
  artist_name TEXT NOT NULL
);

CREATE TABLE producers
(
  producer_id SERIAL PRIMARY KEY,
  producer_name TEXT NOT NULL
);

CREATE TABLE albums
(
  album_id SERIAL PRIMARY KEY,
  album_title TEXT NOT NULL
);

CREATE TABLE songs
(
  song_id SERIAL PRIMARY KEY,
  song_title TEXT NOT NULL,
  album_id INTEGER NOT NULL,
  release_date TIMESTAMP NOT NULL,
  duration_in_seconds INTEGER NOT NULL
);

CREATE TABLE album_artists
(
  album_id INTEGER NOT NULL,
  artist_id INTEGER NOT NULL
);

CREATE TABLE album_producers
(
  album_id INTEGER NOT NULL,
  producer_id INTEGER NOT NULL
);

CREATE TABLE songs_tmp
(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  duration_in_seconds INTEGER NOT NULL,
  release_date DATE NOT NULL,
  artists TEXT[] NOT NULL,
  album TEXT NOT NULL,
  producers TEXT[] NOT NULL
);

-- drop table albums;
-- drop table artists;
-- drop table producers;
-- drop table songs_tmp;
-- drop table songs;
-- drop table album_artists;
-- drop table album_producers;

INSERT INTO songs_tmp
  (title, duration_in_seconds, release_date, artists, album, producers)
VALUES
  ('MMMBop', 238, '04-15-1997', '{"Hanson"}', 'Middle of Nowhere', '{"Dust Brothers", "Stephen Lironi"}'),
  ('Bohemian Rhapsody', 355, '10-31-1975', '{"Queen"}', 'A Night at the Opera', '{"Roy Thomas Baker"}'),
  ('One Sweet Day', 282, '11-14-1995', '{"Mariah Cary", "Boyz II Men"}', 'Daydream', '{"Walter Afanasieff"}'),
  ('Shallow', 216, '09-27-2018', '{"Lady Gaga", "Bradley Cooper"}', 'A Star Is Born', '{"Benjamin Rice"}'),
  ('How You Remind Me', 223, '08-21-2001', '{"Nickelback"}', 'Silver Side Up', '{"Rick Parashar"}'),
  ('New York State of Mind', 276, '10-20-2009', '{"Jay Z", "Alicia Keys"}', 'The Blueprint 3', '{"Al Shux"}'),
  ('Dark Horse', 215, '12-17-2013', '{"Katy Perry", "Juicy J"}', 'Prism', '{"Max Martin", "Cirkut"}'),
  ('Moves Like Jagger', 201, '06-21-2011', '{"Maroon 5", "Christina Aguilera"}', 'Hands All Over', '{"Shellback", "Benny Blanco"}'),
  ('Complicated', 244, '05-14-2002', '{"Avril Lavigne"}', 'Let Go', '{"The Matrix"}'),
  ('Say My Name', 240, '11-07-1999', '{"Destiny''s Child"}', 'The Writing''s on the Wall', '{"Darkchild"}');

insert into artists
  (artist_name)
select distinct unnest(artists) as artist_name from songs_tmp;

insert into producers
(producer_name)
select distinct unnest(producers) as producer_name from songs_tmp;

insert into albums
(album_title)
select distinct album
from songs_tmp;

insert into songs
(song_title, album_id, duration_in_seconds, release_date)
select distinct s.title, a.album_id, s.duration_in_seconds, s.release_date
from songs_tmp as s
inner join albums as a
on a.album_title = s.album;

insert into album_artists
(album_id, artist_id)
select distinct a.album_id, t.artist_id
from ((select distinct album, unnest(artists) as artist from songs_tmp) as s
inner join albums as a
on a.album_title = s.album)
inner join artists as t
on t.artist_name = s.artist;

insert into album_producers
(album_id, producer_id)
select distinct a.album_id, t.producer_id
from ((select distinct album, unnest(producers) as producer from songs_tmp) as s
inner join albums as a
on a.album_title = s.album)
inner join producers as t
on t.producer_name = s.producer;
