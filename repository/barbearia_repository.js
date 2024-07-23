const dataAccess = require("./data_access");

async function buscarPorId(idBarbearia) {
  resultSet = dataAccess.queryExec("S", 'select * from barbearia where "idBarbearia" = $1', [idBarbearia]);
  return resultSet;
}

module.exports = {
  buscarPorId,
};
