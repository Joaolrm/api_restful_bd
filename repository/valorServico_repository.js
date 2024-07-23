const dataAccess = require("./data_access");

async function buscarPorId(idValorServico) {
  let optional = {};
  optional.value = [idValorServico];
  resultSet = dataAccess.queryExec("S", 'select * from valorservico where "idValorServico" = $1', optional);
  return resultSet;
}

module.exports = {
  buscarPorId,
};
