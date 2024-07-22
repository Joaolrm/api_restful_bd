const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "123456",
  host: "localhost",
  port: 5432,
  database: "barbearia",
});

async function queryExec(optQuery, query, values) {
  const cliente = await pool.connect();
  const result = await cliente.query(query, values);

  if (optQuery == "S") {
    resultQuery = result.rows[0];
  } else if (optQuery == "M") {
    resultQuery = result.rows;
  }

  cliente.release();
  return resultQuery;
}

module.exports = {
  queryExec,
};
