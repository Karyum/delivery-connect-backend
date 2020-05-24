BEGIN;

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  phone VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(1000) NOT NULL,
  email VARCHAR(100) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  role VARCHAR(10) NOT NULL, 
  device_id VARCHAR(100) UNIQUE NOT NULL
);

INSERT INTO users (phone, password, email, role, device_id) VALUES
(
    '0543198210', 
    '$2b$10$7cNGQVRiflCCDmVxTKk4Eu52Jf5DVakSLyRL1xS7BFoOFzXIXuYp2', 
    'mario.saliba98@gmail.com', 
    'delviery', 
    '1iv263ecxt');

INSERT INTO users (phone, password, email, role, device_id) VALUES
(
    '0543198211', 
    '$2b$10$7cNGQVRiflCCDmVxTKk4Eu52Jf5DVakSLyRL1xS7BFoOFzXIXuYp2', 
    'mario.saliba98@gmail.com', 
    'owner', 
    '1iv263ecxtsds');

COMMIT;
