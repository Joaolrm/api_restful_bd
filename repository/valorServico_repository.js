const dataAccess = require("./data_access");

async function buscarPorId(idValorServico) {
  resultSet = dataAccess.queryExec("S", "select * from valorservico where idvalorservico = $1", [idValorServico]);
  return resultSet;
}

module.exports = {
  buscarPorId,
};
