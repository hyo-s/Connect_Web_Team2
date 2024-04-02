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

insert into reply(rcontent,bno_fk,mno_fk) values
('댓글내용1',1,1),
('댓글내용2',2,2),
('댓글내용3',3,3),
('댓글내용4',4,4),
('댓글내용5',1,2),
('댓글내용6',2,3);

insert into follow(tofollow, fromfollow) values
(1, 2),
(1, 3),
(1, 4),
(2, 1),
(2, 3),
(3, 1),
(4, 1);

/*anonym_board 샘플*/
insert into anonym_board(abcontent, mno_fk) values
("내용1", 1);
insert into anonym_board(abcontent, mno_fk) values
("내용2", 2);

