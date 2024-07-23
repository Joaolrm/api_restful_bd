const dataAccess = require("./data_access");

async function buscarPorId(idBarbearia) {
  let optional = {};
  optional.value = [idBarbearia];

  resultSet = await dataAccess.queryExec("S", 'select * from barbearia where "idBarbearia" = $1', optional);
  if (resultSet) {
    return resultSet;
  } else {
    throw {id:404, message:"Barbearia não encontrada"};
  }
}

module.exports = {
  buscarPorId,
};  
