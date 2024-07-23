const dataAccess = require("./data_access");
const servico_repository = require("./servico_repository");
const barbearia_repository = require("./barbearia_repository");
const barbeiro_repository = require("./barbeiro_repository");
const valorServico_repository = require("./valorServico_repository");

async function listar() {
  let optional = {};
  resultSet = dataAccess.queryExec("M", "select * from agendamento", optional);
  return resultSet;
}

async function buscarPorId(idAgendamento) {
  let optional = {};
  optional.value = [idAgendamento];
  resultSet = dataAccess.queryExec(
    "S",
    'select * from agendamento where "idAgendamento" = $1',
    optional
  );
  return resultSet;
}

async function inserir(agendamento) {
  const { idBarbearia, idBarbeiro, idServico, dataHoraServico } = agendamento;
  const idAgendamento = `${idBarbearia}${idBarbeiro}${idServico}${dataHoraServico}`;

  let optional = {};
  optional.value = [
    idAgendamento,
    idBarbearia,
    idBarbeiro,
    idServico,
    dataHoraServico,
  ];

  resultSet = dataAccess.queryExec(
    "S",
    `INSERT INTO
		  agendamento ("idAgendamento", "idBarbearia", "idBarbeiro", "idServico", "dataHoraServico")
	  VALUES
      ($1, $2, $3, $4, $5)
    RETURNING *`,
    optional
  );
  return resultSet;
}

async function buscarPorData(data) {
  const query = `
  select 
    agendamento."idAgendamento"
    ,agendamento."dataHoraServico"
    ,agendamento."idBarbearia"
    ,barbearia."nomeBarbearia"
    ,barbearia."cnpj"
    ,barbearia."horarioAbertura"
    ,barbearia."horarioFechamento"
    ,agendamento."idBarbeiro"
    ,barbeiro."nomeBarbeiro"
    ,barbeiro."cpf"
    ,barbeiro."telefone"
    ,agendamento."idServico"
    ,servico."descricaoServico"
    ,valorservico."idValorServico"
    ,valorservico."valorServico"
  from 
    agendamento
  inner join
    barbearia
    on 
      barbearia."idBarbearia" = agendamento."idBarbearia"
  inner join
    barbeiro
    on 
      barbeiro."idBarbeiro" = agendamento."idBarbeiro"
  inner join
    servico
    on 
      servico."idServico" = agendamento."idServico"
  inner join
    valorservico
    on 
      valorservico."idBarbearia" = agendamento."idBarbearia"
      and valorservico."idBarbeiro" = agendamento."idBarbeiro"
      and valorservico."idServico" = agendamento."idServico"
  where 
    "dataHoraServico" like $1
  `;

  function mapFunction(agendamento) {
    return {
      idAgendamento: agendamento.idAgendamento,
      barbearia: {
        idBarbearia: agendamento.idBarbearia,
        nomeBarbearia: agendamento.nomeBarbearia,
        cnpj: agendamento.cnpj,
        horarioAbertura: agendamento.horarioAbertura,
        horarioFechamento: agendamento.horarioFechamento,
      },
      barbeiro: {
        idBarbeiro: agendamento.idBarbeiro,
        nomeBarbeiro: agendamento.nomeBarbeiro,
        cpf: agendamento.cpf,
        telefone: agendamento.telefone,
      },
      servico: {
        idServico: agendamento.idServico,
        descricaoServico: agendamento.descricaoServico,
      },
      valorServico: {
        idValorServico: agendamento.idValorServico,
        valorServico: agendamento.valorServico,
      },
    };
  }

  let optional = {};
  optional.value = [data];
  optional.mapFunction = mapFunction;

  resultSet = dataAccess.queryExec("M", query, optional);
  return resultSet;
}

async function main() {
  try {
    const data = await buscarPorData("2024-07-07%");
    console.log("Resultado:", data);
  } catch (error) {
    console.error("Erro:", error.message);
  }
}

main();

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
  inserir,
  buscarPorData,
  // atualizar,
  // deletar,
};
