const { query } = require("express");
const dataAccess = require("./data_access");

async function buscarPorId(idBarbearia) {
  resultSet = dataAccess.queryExec("S", "select * from barbearia where idbarbearia = $1", [idBarbearia]);
  return resultSet;
}

async function main() {
  try {
    const data = await buscarPorId(1);
    console.log("Resultado:", data);
  } catch (error) {
    console.error("Erro:", error.message);
  }
}

main();

module.exports = {
  buscarPorId,
};
