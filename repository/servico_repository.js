const dataAccess = require("./data_access");

async function buscarPorId(idServico) {
  let optional = {};
  optional.value = [idServico];
  resultSet = dataAccess.queryExec("S", 'select * from servico where "idServico" = $1', optional);
  return resultSet;
}

module.exports = {
  buscarPorId,
};
