drop database if exists connectweb;
create database connectweb;
use connectweb;

select * from board;
select * from member;
select * from gallery;
select * from reply;
select * from follow;

# 팔로워
select f.fno, m.mname from follow f join member m on m.mno = f.fromfollow where f.tofollow = 1;
# 팔로잉
select f.fno, m.mname from follow f join member m on m.mno = f.tofollow where f.fromfollow = 1;