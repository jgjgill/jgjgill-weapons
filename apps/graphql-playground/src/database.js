import { existsSync } from "node:fs";
import Database from "better-sqlite3";

const dbPath = "blog.db";
const db = new Database(dbPath);

if (!existsSync(dbPath)) {
	db.exec(`
    DROP TABLE IF EXISTS posts;
    DROP TABLE IF EXISTS comments;
    
    CREATE TABLE posts (
      id INTEGER PRIMARY KEY,
      title TEXT,
      content TEXT
    );
    
    CREATE TABLE comments (
      id INTEGER PRIMARY KEY,
      post_id INTEGER,
      content TEXT,
      FOREIGN KEY (post_id) REFERENCES posts (id)
    );
    
    -- 샘플 데이터 삽입
    INSERT INTO posts (title, content) VALUES 
      ('첫 번째 글', '안녕하세요'),
      ('두 번째 글', '반갑습니다'),
      ('세 번째 글', '날씨가 좋네요');
      
    INSERT INTO comments (post_id, content) VALUES 
      (1, '좋은 글이에요!'),
      (1, '감사합니다'),
      (2, '동의합니다'),
      (3, '멋진 글이네요'),
      (3, '잘 보고 갑니다');
  `);
}

export default db;
