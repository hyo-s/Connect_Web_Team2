
    insert into member(mname, mphone, mid, mnickname, mpw, memail, mbirth, mimg) values
    ('홍길동','010-7897-1122','qawsed12','adminji_','1111','adminji06@ezen.com','980417', 'https://elasticbeanstalk-ap-northeast-2-637423542236.s3.ap-northeast-2.amazonaws.com/default.png'),
    ('박영미','010-6589-3446','azsxdc12','song','1111','abc777z@ezen.com','990420', 'https://elasticbeanstalk-ap-northeast-2-637423542236.s3.ap-northeast-2.amazonaws.com/default.png'),
    ('김민수','010-3256-4568','sere4580','hyosajang','1111','sere4580@ezen.com','960303', 'https://elasticbeanstalk-ap-northeast-2-637423542236.s3.ap-northeast-2.amazonaws.com/default.png'),
    ('아무개','010-1536-2458','qwer123','jangchen','1111','jang333@ezen.com','970504', 'https://elasticbeanstalk-ap-northeast-2-637423542236.s3.ap-northeast-2.amazonaws.com/default.png');


    insert into board(bcontent, mno) values
    ('눈 내린다~',1),
    ('★',2),
    ('별 너무 이쁘다',3),
    ('일본여행~☆',4),
    ('Coffee',5);


    insert into gallery(gname, bno) values
    ('https://elasticbeanstalk-ap-northeast-2-637423542236.s3.ap-northeast-2.amazonaws.com/겨울1.jpg',1),
    ('https://elasticbeanstalk-ap-northeast-2-637423542236.s3.ap-northeast-2.amazonaws.com/별1.jpg',2),
    ('https://elasticbeanstalk-ap-northeast-2-637423542236.s3.ap-northeast-2.amazonaws.com/별2.jpg',3),
    ('https://elasticbeanstalk-ap-northeast-2-637423542236.s3.ap-northeast-2.amazonaws.com/오사카2.jpg',4),
    ('https://elasticbeanstalk-ap-northeast-2-637423542236.s3.ap-northeast-2.amazonaws.com/coffee2.jpg',5);


    insert into reply(rcontent, bno, mno) values
    ('재밌겠당',1,2),('완전 이쁘다~',2,3),('오늘 재밌었어~',2,4),('여기는 어디야?',3,1),('어디야어디야 알려줘',4,2),('완전이뻐',5,3);

    insert into follow(tofollow, fromfollow) values
    (1, 2),(1, 3),(1, 4),(2, 1),(3, 1),(4, 1);

    insert into birthboard(bbcontent, mno, cdate, bbimg) values
    ("생일축하해~", 1, '2024-04-09','https://elasticbeanstalk-ap-northeast-2-637423542236.s3.ap-northeast-2.amazonaws.com/생일축하1.jpg');


