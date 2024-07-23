const dataAccess = require("./data_access");

async function listar() {
  let optional = {};
  resultSet = await dataAccess.queryExec(
    "M",
    "select * from agendamento",
    optional
  );
  return resultSet;
}

async function buscarPorId(idAgendamento) {
  let optional = {};
  optional.value = [idAgendamento];
  resultSet = await dataAccess.queryExec(
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

  resultSet = await dataAccess.queryExec(
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
  optional.value = [data + "%"];
  optional.mapFunction = mapFunction;

  resultSet = await dataAccess.queryExec("M", query, optional);
  return resultSet;
}

async function deletar(idAgendamento) {
  let optional = {};
  optional.value = [idAgendamento];
  resultSet = await dataAccess.queryExec(
    "S",
    'delete from agendamento where "idAgendamento" = $1 returning * ',
    optional
  );
  return resultSet;
}

async function atualizar(idAgendamento, agendamentoAlterado) {
  const { idBarbearia, idBarbeiro, idServico, dataHoraServico } =
    agendamentoAlterado;
  const idAgendamentoAlterado = `${idBarbearia}${idBarbeiro}${idServico}${dataHoraServico}`;
  let optional = {};
  optional.value = [
    idAgendamento,
    idBarbearia,
    idBarbeiro,
    idServico,
    dataHoraServico,
    idAgendamentoAlterado,
  ];

  let agendamento = await buscarPorId(idAgendamento);
  if (agendamento) {
    resultSet = await dataAccess.queryExec(
      "S",
      `UPDATE 
        agendamento
      SET
        "idBarbearia" = $2,
        "idBarbeiro" = $3,
        "idServico" = $4,
        "dataHoraServico" = $5,
        "idAgendamento" = $6
      WHERE 
        "idAgendamento" = $1
      RETURNING 
        *;
      `,
      optional
    );
  }
  return resultSet;
}

module.exports = {
  listar,
  buscarPorId,
  buscarPorData,
  inserir,
  deletar,
  atualizar,
};
