DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS users;

-- Crear tabla "users"
CREATE TABLE users (
  	user_id SERIAL PRIMARY KEY,
  	username VARCHAR(50),
  	email VARCHAR(100) NOT NULL,
	password VARCHAR(300) NOT NULL
);

-- Crear tabla "books"
CREATE TABLE books (
  	book_id SERIAL PRIMARY KEY,
  	title VARCHAR(100) NOT NULL,
  	author VARCHAR(100) NOT NULL,
  	user_id INT REFERENCES users(user_id) ON DELETE CASCADE
);

-- Crear tabla "favorites"
CREATE TABLE favorites (
  	favorite_id SERIAL PRIMARY KEY,
  	user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
  	book_id INT REFERENCES books(book_id) ON DELETE CASCADE
);

-- Insertar usuarios
INSERT INTO users (username, email, password) VALUES
  ('Usuario1', 'usuario1@example.com', '123123'),
  ('Usuario2', 'usuario2@example.com', '123123'),
  ('Usuario3', 'usuario3@example.com', '123123');

-- Insertar libros
INSERT INTO books (title, author, user_id) VALUES
  ('Libro1', 'Autor1', 1),
  ('Libro2', 'Autor2', 1),
  ('Libro3', 'Autor3', 2),
  ('Libro4', 'Autor4', 2),
  ('Libro5', 'Autor5', 3),
  ('Libro6', 'Autor6', 3),
  ('Libro7', 'Autor7', 3),
  ('Libro8', 'Autor8', 3),
  ('Libro9', 'Autor9', 3),
  ('Libro10', 'Autor10', 3);

-- Insertar favoritos
INSERT INTO favorites (user_id, book_id) VALUES
  (1, 2),
  (1, 4),
  (2, 6),
  (2, 8),
  (3, 10);