import * as dotenv from "dotenv";
dotenv.config();

import pkg from "pg";
const { Pool } = pkg;

const connectionString = process.env.PG_STRING_URL;

export const pool = connectionString
  ? new Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: false,
      },
      allowExitOnIdle: true,
    })
  : new Pool({
      allowExitOnIdle: true,
    });

try {
  // Realiza una consulta sencilla para verificar la conexión
  const res = await pool.query("SELECT NOW()");
  // Si la conexión es exitosa, imprime la fecha actual devuelta por la consulta
  console.log(
    "Conexión exitosa. Hora actual en la base de datos:",
    res.rows[0].now
  );
} catch (error) {
  console.log(error);
}
