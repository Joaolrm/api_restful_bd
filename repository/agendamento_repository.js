const dataAccess = require("./data_access");
const servico_repository = require("./servico_repository");
const barbearia_repository = require("./barbearia_repository");
const barbeiro_repository = require("./barbeiro_repository");
const valorServico_repository = require("./valorServico_repository");

async function listar() {
  resultSet = dataAccess.queryExec("M", "select * from agendamento");
  return resultSet;
}

// async function inserir(agendamento) {
//   const { idBarbearia, idBarbeiro, idServico, dataHoraServico } = agendamento;
//   const idAgendamento = `${idBarbearia}${idBarbeiro}${idServico}${dataHoraServico}`;

//   resultSet = dataAccess.queryExec(
//     "S",
//     `INSERT INTO
// 		  agendamento (idAgendamento, idBarbearia, idBarbeiro, idServico, dataHoraServico)
// 	  VALUES
//       ($1, $2, $3, $4, $5)
//     RETURNING *`,
//     [idAgendamento, idBarbearia, idBarbeiro, idServico, dataHoraServico]
//   );
//   return resultSet;
// }

async function buscarPorId(idAgendamento) {
  resultSet = dataAccess.queryExec(
    "S",
    'select * from agendamento where "idAgendamento" = $1',
    [idAgendamento]
  );
  return resultSet;
}

// function buscarPorData(data) {
//   let sevicosRealizadosNaData = [];
//   for (let servicoRealizado of listaServicosRealizados) {
//     if (servicoRealizado.dataHoraServico.substring(0, 10) == data) {
//       let descricaoServico = servico_repository.buscarPorId(
//         servicoRealizado.idServico
//       );
//       let valorServico = valorServico_repository.buscarPorKeyTabela(
//         servicoRealizado.idBabearia,
//         servicoRealizado.idBarbeiro,
//         servicoRealizado.idServico
//       );
//       let barbeiro = barbeiro_repository.buscarPorId(
//         servicoRealizado.idBarbeiro
//       );
//       let barbearia = barbearia_repository.buscarPorId(
//         servicoRealizado.idBabearia
//       );

//       let servico = servico_repository.buscarPorId(servicoRealizado.idServico);

//       let servicoRealizadoCopy = {};

//       servicoRealizadoCopy.servico = {
//         idServico: servicoRealizado.idServico,
//         dataHoraServico: servicoRealizado.dataHoraServico,
//         descricaoServico: servico.descricaoServico,
//         valorServico: valorServico.valorServico,
//       };

//       servicoRealizadoCopy.barbeiro = {
//         idBarbeiro: barbeiro.idBarbeiro,
//         nomeBarbeiro: barbeiro.nomeBarbeiro,
//       };

//       servicoRealizadoCopy.barbearia = {
//         idBabearia: servicoRealizado.idBabearia,
//         nomeBarbearia: barbearia.nomeBarbearia,
//       };

//       sevicosRealizadosNaData.push(servicoRealizadoCopy);
//     }
//   }
//   return sevicosRealizadosNaData;
// }

// function buscarPorKeyTabela(
//   idBabearia,
//   idBarbeiro,
//   idServico,
//   dataHoraServico
// ) {
//   for (let servicoRealizado of listaServicosRealizados) {
//     if (
//       servicoRealizado.idBabearia == idBabearia &&
//       servicoRealizado.idBarbeiro == idBarbeiro &&
//       servicoRealizado.idServico == idServico &&
//       servicoRealizado.dataHoraServico == dataHoraServico
//     ) {
//       return servicoRealizado;
//     }
//   }
// }

// function atualizar(
//   idBabearia,
//   idBarbeiro,
//   idServico,
//   dataHoraServico,
//   servicoRealizadoAlterado
// ) {
//   let servicoRealizado = buscarPorKeyTabela(
//     idBabearia,
//     idBarbeiro,
//     idServico,
//     dataHoraServico
//   );
//   if (servicoRealizado) {
//     servicoRealizado.idBabearia = servicoRealizadoAlterado.idBabearia;
//     servicoRealizado.idBarbeiro = servicoRealizadoAlterado.idBarbeiro;
//     servicoRealizado.idServico = servicoRealizadoAlterado.idServico;
//     servicoRealizado.dataHoraServico = servicoRealizadoAlterado.dataHoraServico;
//   }
//   return servicoRealizado;
// }

// function deletar(idBabearia, idBarbeiro, idServico, dataHoraServico) {
//   let servicoRealizado;
//   for (let indice in listaServicosRealizados) {
//     if (
//       listaServicosRealizados[indice].idBabearia == idBabearia &&
//       listaServicosRealizados[indice].idBarbeiro == idBarbeiro &&
//       listaServicosRealizados[indice].idServico == idServico &&
//       listaServicosRealizados[indice].dataHoraServico == dataHoraServico
//     ) {
//       servicoRealizado = listaServicosRealizados.splice(indice, 1)[0];
//     }
//   }
//   return servicoRealizado;
// }

module.exports = {
  listar,
  buscarPorId,
  // inserir,
  // atualizar,
  // deletar,
  // buscarPorData,
};
