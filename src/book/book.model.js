import { pool } from "../database/connection.js";

const create = async (book) => {
  const { title, author, user_id } = book;
  const query =
    "INSERT INTO books (title, author, user_id) VALUES ($1, $2, $3) RETURNING *";
  const values = [title, author, user_id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const findOne = async (id) => {
  const query = "SELECT * FROM books WHERE book_id = $1";
  const values = [id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const remove = async (id) => {
  const query = "DELETE FROM books WHERE book_id = $1";
  const values = [id];
  await pool.query(query, values);
};

export const bookModel = {
  create,
  findOne,
  remove,
};
