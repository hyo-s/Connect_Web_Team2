insert into member(mname, mphone, mid, mnickname, mpw, memail, mbirth, mimg) values
('유재석','010-1111-1111','aaa','aaa','aaa','aaa@aaa.com','980101', 'default.png'),
('강호동','010-2222-2222','bbb','bbb','bbb','bbb@bbb.com','990202', 'default.png'),
('신동엽','010-3333-3333','ccc','ccc','ccc','ccc@ccc.com','960303', 'default.png'),
('서장훈','010-4444-4444','ddd','ddd','ddd','ddd@ddd.com','970404', 'default.png');


insert into board(bcontent, mno) values
('게시물내용1',1),
('게시물내용2',2),
('게시물내용3',3),
('게시물내용4',4),
('게시물내용5',1);

insert into gallery(gname, bno) values
('바탕화면1.jpg',1),
('바탕화면2.jpg',2),
('반가워1.jpg',1),
('반가워2.jpg',3),
('반가워3.jpg',4),
('세로이미지.jpg',5);


insert into reply(rcontent, bno, mno) values
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

/*birthboard 샘플*/
insert into birthboard(bbcontent, mno, cdate) values
("내용입니다1", 1, '2024-04-08');
insert into birthboard(bbcontent, mno) values
("내용입니다2", 2);

