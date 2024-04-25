-- 创建用户表
CREATE TABLE IF NOT EXISTS "user" (
    uid SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    followcnt INTEGER DEFAULT 0,
    fanscnt INTEGER DEFAULT 0,
    intro TEXT,
    smallavatar VARCHAR(255),
    datetime TIMESTAMP,
    updatedtime TIMESTAMP,
    deletedtime TIMESTAMP
);

-- 插入用户数据
INSERT INTO "user" (username, email, password, followcnt, fanscnt, intro, smallavatar) VALUES
('Alice', 'alice@example.com', 'password123', 5, 10, '书籍是人类进步的阶梯。', 'uploads\imgs\1714047333699.jpg'),
('Bob', 'bob@example.com', 'password123', 3, 8, '真理惟一可靠的标准就是永远自相符合。', 'uploads\imgs\1714047333699.jpg')
ON CONFLICT (username) DO NOTHING;

-- 创建书籍表
CREATE TABLE IF NOT EXISTS book (
    bookid SERIAL PRIMARY KEY,
    bookname VARCHAR(255) NOT NULL,
    cardcnt INTEGER DEFAULT 0,
    picpath VARCHAR(255),
    datetime TIMESTAMP,
    updatedtime TIMESTAMP,
    deletedtime TIMESTAMP,
    user_uid INTEGER REFERENCES "user"(uid)
);

-- 插入书籍数据
INSERT INTO book (bookname, cardcnt, picpath, user_uid) VALUES
('默认文集', 0, '/path/to/default.jpg', 1),
('自然摄影', 5, '/path/to/nature.jpg', 2);

-- 创建卡片表
CREATE TABLE IF NOT EXISTS card (
    textcardid SERIAL PRIMARY KEY,
    picpath VARCHAR(255),
    commentcnt INTEGER DEFAULT 0,
    "from" VARCHAR(255),
    type VARCHAR(255),
    collectcnt INTEGER DEFAULT 0,
    replycnt INTEGER DEFAULT 0,
    dislikecnt INTEGER DEFAULT 0,
    content TEXT,
    musicurl VARCHAR(255),
    category VARCHAR(255),
    title VARCHAR(255),
    original VARCHAR(255),
    datetime TIMESTAMP ,
    updatedtime TIMESTAMP ,
    deletedtime TIMESTAMP ,
    user_uid INTEGER REFERENCES "user"(uid),
    book_bookid INTEGER REFERENCES book(bookid)
);

-- 插入卡片数据
INSERT INTO "card" ("textcardid", "picpath", "commentcnt", "from", "type", "collectcnt", "replycnt", "dislikecnt", "content", "musicurl", "category", "title", "original", "datetime", "updatedtime", "deletedtime", "user_uid", "book_bookid") VALUES (3, 'uploads\imgs\1714044774868.jpg', 0, '马里奥·普佐', 'one_1_1_0_1', 0, 0, 0, '要宽恕，要遗忘，生命本来就充满了不幸。', NULL, '3', '《教父》', '0', '2024-04-25 19:32:54.873', '2024-04-25 19:32:54.873', NULL, 4, 4);
INSERT INTO "card" ("textcardid", "picpath", "commentcnt", "from", "type", "collectcnt", "replycnt", "dislikecnt", "content", "musicurl", "category", "title", "original", "datetime", "updatedtime", "deletedtime", "user_uid", "book_bookid") VALUES (4, 'uploads\imgs\1714044880751.jpg', 0, '海明威', 'one_1_0_3_1', 0, 0, 0, '一个人并不是生来要给打败的，你尽可以把他消灭掉，可就是打不败他', NULL, '0', '老人与海', '0', '2024-04-25 19:34:40.755', '2024-04-25 19:34:40.755', NULL, 4, 4);
INSERT INTO "card" ("textcardid", "picpath", "commentcnt", "from", "type", "collectcnt", "replycnt", "dislikecnt", "content", "musicurl", "category", "title", "original", "datetime", "updatedtime", "deletedtime", "user_uid", "book_bookid") VALUES (2, '', 0, 'Online', 'Image', 2, 1, 1, '一寸光阴一寸金，寸金难买寸光阴。', NULL, 'Nature', '星空', 'No', '2024-04-25 11:29:26.265132', '2024-04-25 11:29:26.265132', NULL, 2, 2);
INSERT INTO "card" ("textcardid", "picpath", "commentcnt", "from", "type", "collectcnt", "replycnt", "dislikecnt", "content", "musicurl", "category", "title", "original", "datetime", "updatedtime", "deletedtime", "user_uid", "book_bookid") VALUES (1, '', 2, 'Online', 'Image', 5, 3, 0, '天空没有翅膀的痕迹，而我已飞过。', '/path/to/music.mp3', 'Nature', '落日', 'Yes', '2024-04-25 11:29:26.265132', '2024-04-25 11:29:26.265132', NULL, 1, 1);
INSERT INTO "card" ("textcardid", "picpath", "commentcnt", "from", "type", "collectcnt", "replycnt", "dislikecnt", "content", "musicurl", "category", "title", "original", "datetime", "updatedtime", "deletedtime", "user_uid", "book_bookid") VALUES (6, 'uploads\imgs\1572798064761.jpg', 0, '定西', 'one_1_1_0_1', 0, 0, 0, '定西', 'uploads\music\dx.mp3', '2000', '定西', '1', '2024-04-25 19:47:24.367', '2024-04-25 19:47:24.367', NULL, 4, 4);


-- 创建评论表
CREATE TABLE IF NOT EXISTS comment (
    commentid SERIAL PRIMARY KEY,
    content TEXT,
    receiverid INTEGER,
    likecnt INTEGER DEFAULT 0,
    datetime TIMESTAMP,
    updatedtime TIMESTAMP,
    deletedtime TIMESTAMP,
    card_textcardid INTEGER REFERENCES card(textcardid),
    user_uid INTEGER,
    receiver_uid INTEGER
);

-- 插入评论数据
INSERT INTO comment (content, receiverid, likecnt, card_textcardid) VALUES
('风景这边独好。', 2, 5, 1),
('世界那么大，我想去看看。', 1, 3, 1)
