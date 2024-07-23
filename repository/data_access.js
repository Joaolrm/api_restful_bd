const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "123456",
  host: "localhost",
  port: 5432,
  database: "barbearia",
});

async function queryExec(optQuery, query, optional) {
  const cliente = await pool.connect();
  let resultQuery;
  try {
    const result = await cliente.query(query, optional.value);
    if (optional.mapFunction) {
      resultQuery =
        optQuery == "S"
          ? result.rows[0].map(optional.mapFunction)
          : result.rows.map(optional.mapFunction);
    } else {
      resultQuery = optQuery == "S" ? result.rows[0] : result.rows;
    }
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  } finally {
    cliente.release();
  }
  return resultQuery;
}

module.exports = {
  queryExec,
};
