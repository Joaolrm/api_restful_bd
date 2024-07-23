const dataAccess = require("./data_access");

async function buscarPorId(idBarbearia) {
  let optional = {};
  optional.value = [idBarbearia];

  resultSet = dataAccess.queryExec("S", 'select * from barbearia where "idBarbearia" = $1', optional);
  return resultSet;
}

module.exports = {
  buscarPorId,
};
