-- write your queries here

-- Join the two tables so that every column and record appears, regardless of if there is not an owner_id.
select o.id as id, first_name, last_name, v.id as id, make, model, year, price, o.id as owner_id  from owners as o left join vehicles as v
on v.owner_id = o.id

-- Count the number of cars for each owner.
select first_name, last_name, COALESCE(count,0) as count from owners as o left join (select owner_id, count(*) from vehicles as v
group by owner_id) as v
on v.owner_id = o.id

-- Count the number of cars for each owner and display the average price for each of the cars as integers.
select first_name, last_name, average_price, count
from owners as o
inner join (select v.owner_id, avg(v.price) as average_price, count(*) as count
from vehicles as v
group by v.owner_id) as v
on o.id = v.owner_id
