const agendamento_service = require("../service/agendamento_service");

async function listar(req, res) {
  res.json(await agendamento_service.listar());
}

async function inserir(req, res) {
  let agendamento = req.body;

  try {
    const agendamentoInserido = await agendamento_service.inserir(agendamento);
    res.status(201).json(agendamentoInserido);
  } catch (err) {
    res.status(err.id).json(err);
  }
}

async function buscarPorData(req, res) {
  const data = req.params.data;
  try {
    const servicosRealizadosPorData = await agendamento_service.buscarPorData(data);
    res.json(servicosRealizadosPorData);
  } catch (err) {
    res.status(err.id).json(err);
  }
}

async function buscarPorId(req, res) {
  const idAgendamento = req.params.idAgendamento;
  try {
    const agendamento =
      await agendamento_service.buscarPorId(idAgendamento);
    res.json(agendamento);
  } catch (err) {
    res.status(err.id).json(err);
  }
}

async function atualizar(req, res) {
  const agendamentoAlterado = req.body;
  const idAgendamento = req.params.idAgendamento;
  try {
    let servicoRealizadoAlterado = await agendamento_service.atualizar(
      idAgendamento,
      agendamentoAlterado
    );
    res.json(servicoRealizadoAlterado);
  } catch (err) {
    res.status(err.id).json(err);
  }
}

async function deletar(req, res) {
  const idAgendamento = req.params.idAgendamento;
  try {
    const servicoRealizadoDeletado = await agendamento_service.deletar(idAgendamento);
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
