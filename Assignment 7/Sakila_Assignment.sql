use sakila;

/*1)*/
SELECT first_name, last_name
from actor;

select concat(upper(first_name), " ", upper(last_name)) as "Actor Name"
from actor;

/*2)*/
select actor_id, first_name, last_name
from actor
where (first_name = "Joe");

select *
from actor
where last_name like "%GEN%";

select *
from actor
where last_name like "%LI%"
order by last_name, first_name;

select country_id, country
from country
where country in('Afghanistan', 'Bangladesh', 'China');

/*3)*/
Alter table actor
add  Description BLOB; 

alter table actor
drop column Description;

/*4)*/
select last_name, count(*) as 'Name Count'
from actor
group by last_name;

select last_name, count(*) as 'Name Count'
from actor
group by last_name
having 'Name Count' >= 2;

update actor
set first_name = "HARPO"
where first_name = "GROUCHO" and last_name = "WILLIAMS";

update actor
set first_name = "GROUCHO"
where first_name = "HARPO" and last_name = "WILLIAMS";

/*5)*/
show create table address;

/*6)*/
select staff.first_name, staff.last_name, address.address
from staff
join address on address.address_id=staff.address_id;

select s.first_name, s.last_name, sum(p.amount) as "Total Amount"
from payment p
join staff s on p.staff_id=s.staff_id
group by s.first_name, s.last_name;

select f.title, count(fa.actor_id) as "Actor Count"
from film f
inner join film_actor fa on f.film_id=fa.film_id
group by f.title;

select f.title, count(i.film_id) as "Count" 
from film f
join inventory i on f.film_id=i.film_id;

select c.first_name, c.last_name, sum(p.amount) as "Total Amount Paid"
from customer c
join payment p on c.customer_id=p.customer_id
group by c.first_name, c.last_name
order by c.last_name;

/*7)*/
select title
from film 
where title regexp"^[kq]" and language_id = "english"; 

select first_name, last_name
from actor
where actor_id 
in (select actor_id from film_actor where film_id
in (select film_id from film where title = "ALONE TRIP"));

select first_name, last_name, email
from customer cu
join address a on (cu.address_id=a.address_id)
join city c on (a.city_id=c.city_id)
join country co on (c.country_id=co.country_id);

select f.title, fc.category_id
from film f
join film_category fc on f.film_id=fc.film_id
having category_id = "FAMILY";

select rental_rate
from film
order by rental_rate desc;

select sta.store_id, sum(p.amount)
from payment p
join staff sta on p.staff_id=sta.staff_id
group by sta.store_id;

select s.store_id, a.city_id, c.country_id
from store s
join address a on s.address_id=a.address_id
join city c on a.city_id=c.city_id;

select c.category_id, sum(p.amount) as "Gross Revenue"
from category c
join film_category fc on c.category_id=fc.category_id
join inventory i on fc.film_id=i.film_id
join rental r on i.inventory_id=r.inventory_id
join payment p on r.staff_id=p.staff_id
order by "Gross Revenue" desc
limit 5;

/*8)*/
create view Top_Five_Genres as
select c.category_id, sum(p.amount) as "Gross Revenue"
from category c
join film_category fc on c.category_id=fc.category_id
join inventory i on fc.film_id=i.film_id
join rental r on i.inventory_id=r.inventory_id
join payment p on r.staff_id=p.staff_id
order by "Gross Revenue" desc
limit 5;

select * from Top_Five_Genres;

drop view Top_Five_Genres;