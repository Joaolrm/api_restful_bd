const dataAccess = require("./data_access");

async function buscarPorId(idServico) {
  resultSet = dataAccess.queryExec("S", 'select * from servico where "idServico" = $1', [idServico]);
  return resultSet;
}

module.exports = {
  buscarPorId,
};
