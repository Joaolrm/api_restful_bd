const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "123456",
  host: "localhost",
  port: 5432,
  database: "barbearia",
});

async function queryExec(query) {
  const cliente = await pool.connect();
  const result = await cliente.query(query);
  const resultQuery = result.rows;
  cliente.release();
  return resultQuery;
}

module.exports = {
  queryExec,
};
