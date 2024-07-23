const agendamento_service = require("../service/agendamento_service");

function listar(req, res) {
  res.json(agendamento_service.listar());
}

function inserir(req, res) {
  let agendamento = req.body;

  try {
    const agendamentoInserido = agendamento_service.inserir(agendamento);
    res.status(201).json(agendamentoInserido);
  } catch (err) {
    res.status(err.id).json(err);
  }
}

function buscarPorData(req, res) {
  const data = req.params.data;
  try {
    const servicosRealizadosPorData = agendamento_service.buscarPorData(data);
    res.json(servicosRealizadosPorData);
  } catch (err) {
    res.status(err.id).json(err);
  }
}

function buscarPorId(req, res) {
  const idAgendamento = req.params.idAgendamento;
  try {
    const servicoRealizadoPorKey =
      agendamento_service.buscarPorId(idAgendamento);
    res.json(servicoRealizadoPorKey);
  } catch (err) {
    res.status(err.id).json(err);
  }
}

function atualizar(req, res) {
  const agendamentoAlterado = req.body;
  const idAgendamento = req.params.idAgendamento;
  try {
    let servicoRealizadoAlterado = agendamento_service.atualizar(
      idAgendamento,
      agendamentoAlterado
    );
    res.json(servicoRealizadoAlterado);
  } catch (err) {
    res.status(err.id).json(err);
  }
}

function deletar(req, res) {
  const idAgendamento = req.params.idAgendamento;
  try {
    const servicoRealizadoDeletado = agendamento_service.deletar(idAgendamento);
    res.json(servicoRealizadoDeletado);
  } catch (err) {
    res.status(err.id).json(err);
  }
}

module.exports = {
  listar,
  inserir,
  buscarPorData,
  buscarPorId,
  atualizar,
  deletar,
};
