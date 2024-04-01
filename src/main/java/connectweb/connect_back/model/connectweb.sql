drop database if exists connectweb;
create database connectweb;
use connectweb;

select * from board;
select * from member;
select * from gallery;
select * from reply;
select * from follow;

select * from follow f inner join member m on f.fromfollow = m.mno where tofollow = 2;