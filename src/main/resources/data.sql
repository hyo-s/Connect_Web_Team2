insert into member(mname, mphone, mid, mnickname, mpw, memail, mbirth) values
('유재석','010-1111-1111','aaa','aaa','aaa','aaa@aaa.com','980101'),
('강호동','010-2222-2222','bbb','bbb','bbb','bbb@bbb.com','990202'),
('신동엽','010-3333-3333','ccc','ccc','ccc','ccc@ccc.com','960303'),
('서장훈','010-4444-4444','ddd','ddd','ddd','ddd@ddd.com','970404');


insert into board(bcontent, mno_fk) values
('게시물내용1',1),
('게시물내용2',2),
('게시물내용3',3),
('게시물내용4',4);

insert into gallery(gname, bno_fk) values
('C:\Users\504\Desktop\Connect_Web_Team2\src\main\resources\img\boardimg\바탕화면1.jpg',1),
('C:\Users\504\Desktop\Connect_Web_Team2\src\main\resources\img\boardimg\바탕화면2.jpg',1);

insert into reply(rcontent,bno_fk,mno_fk) values
('댓글내용1',1,1),
('댓글내용2',2,2),
('댓글내용3',3,3),
('댓글내용4',4,4),
('댓글내용5',1,2),
('댓글내용6',2,3);

insert into follow(tofollow, fromfollow) values
(1, 2),
(2, 1),
(2, 3);