const { query } = require("express");
const dataAccess = require("./data_access");

let idGenerator = 2;
let listaBarbearias = [
  {
    idBarbearia: 1,
    nomeBarbearia: "Barbel",
    cnpj: "99.777.777/0001-66",
    horarioAbertura: "08:00",
    horarioFechamento: "18:00",
  },
  {
    idBarbearia: 2,
    nomeBarbearia: "Barbearia genérica 2",
    cnpj: "99.888.777/0001-66",
    horarioAbertura: "10:00",
    horarioFechamento: "20:00",
  },
];

function buscarPorId(idBarbearia) {
  for (let barbearia of listaBarbearias) {
    if (barbearia.idBarbearia === idBarbearia) {
      return barbearia;
    }
  }
}

async function buscarPorId_bd(idBarbearia) {
  return dataAccess.queryExec("select * from barbearia where idbarbearia = 1");
}

async function main() {
  try {
    const data = await buscarPorId_bd(1);
    console.log("Resultado:", data);
  } catch (error) {
    console.error("Erro:", error.message);
  }
}

main();

module.exports = {
  buscarPorId,
  buscarPorId_bd,
};
