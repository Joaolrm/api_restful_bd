const servico_repository = require("../repository/servico_repository");
const barbeiro_repository = require("../repository/barbeiro_repository");
const barbearia_repository = require("../repository/barbearia_repository");
const agendamento_repository = require("../repository/agendamento_repository");

async function listar() {
  try {
    return await agendamento_repository.listar();
  } catch (err) {
    throw { id: 500, message: err.message };
  }
}

async function buscarPorId(idAgendamento) {
  const agendamento = await agendamento_repository.buscarPorId(idAgendamento);
  if (agendamento) {
    return agendamento;
  } else {
    throw { id: 404, message: "Agendamento não encontrada" };
  }
}

async function buscarPorData(data) {
  const agendamentos = await agendamento_repository.buscarPorData(data);
  if (agendamentos.length > 0) {
    return agendamentos;
  } else {
    throw { id: 404, message: "Nenhum servico realizado encontrado" };
  }
}

async function inserir(agendamento) {
  const { idBarbearia, idBarbeiro, idServico, dataHoraServico } = agendamento;
  const idAgendamento = `${idBarbearia}${idBarbeiro}${idServico}${dataHoraServico}`;
  let barbearia = await barbearia_repository.buscarPorId(idBarbearia);
  let horarioFuncionamentoBarbearia = {
    abertura: barbearia.horarioAbertura,
    fechamento: barbearia.horarioFechamento,
  };

  let horaMinAgendamento = agendamento.dataHoraServico.substring(11);
  if (
    horaMinAgendamento > horarioFuncionamentoBarbearia.abertura &&
    horaMinAgendamento < horarioFuncionamentoBarbearia.fechamento
  ) {
    agendamentoExitente = await agendamento_repository.buscarPorId(
      idAgendamento
    );
    if (agendamentoExitente) {
      throw { id: 400, message: "Agendamento já existe" };
    } else {
      let servico = await servico_repository.buscarPorId(idServico);
      let barbeiro = await barbeiro_repository.buscarPorId(idBarbeiro);
      let barbearia = await barbearia_repository.buscarPorId(idBarbearia);
      if (
        agendamento &&
        idBarbearia &&
        idBarbeiro &&
        idServico &&
        dataHoraServico &&
        servico &&
        barbeiro &&
        barbearia
      ) {
        try {
          return await agendamento_repository.inserir(agendamento);
        } catch (err) {
          throw { id: 500, message: err.message };
        }
      } else {
        throw {
          id: 400,
          message: "Agendamento não possui todos os campos válidos",
        };
      }
    }
  } else {
    throw {
      id: 422,
      message:
        "Serviço realizado não pode ser inserido fora do horário de funcionamento da barbearia",
    };
  }
}

async function atualizar(idAgendamento, agendamentoAlterado) {
  const { idBarbearia, idBarbeiro, idServico, dataHoraServico } =
    agendamentoAlterado;
  const idAgendamentoAtualizado = `${idBarbearia}${idBarbeiro}${idServico}${dataHoraServico}`;

  let barbearia = await barbearia_repository.buscarPorId(idBarbearia);
  let horarioFuncionamentoBarbearia = {
    abertura: barbearia.horarioAbertura,
    fechamento: barbearia.horarioFechamento,
  };

  let horaMinAgendamento = agendamentoAlterado.dataHoraServico.substring(11);

  if (
    agendamentoAlterado &&
    idBarbearia &&
    idBarbeiro &&
    idServico &&
    dataHoraServico
  ) {
    let agendamentoExitente = await agendamento_repository.buscarPorId(idAgendamentoAtualizado);
    if (agendamentoExitente) {
      throw {
        id: 400,
        message: "Já existe um agendamento identico a tentativa de alteração",
      };
    } else {
      let servico = await servico_repository.buscarPorId(idServico);
      let barbeiro = await barbeiro_repository.buscarPorId(idBarbeiro);
      let barbearia = await barbearia_repository.buscarPorId(idBarbearia);
      if (servico && barbeiro && barbearia) {
        if (
          horaMinAgendamento > horarioFuncionamentoBarbearia.abertura &&
          horaMinAgendamento < horarioFuncionamentoBarbearia.fechamento
        ) {
          agendamentoAlterado = await agendamento_repository.atualizar(
            idAgendamento,
            agendamentoAlterado
          );
          if (agendamentoAlterado) {
            return agendamentoAlterado;
          } else {
            throw { id: 404, message: "Agendamento não localizado" };
          }
        } else {
          throw {
            id: 422,
            message:
              "Agendamento não pode ser inserido fora do horário de funcionamento da barbearia",
          };
        }
      } else {
        throw {
          id: 400,
          message:
            "Agendamento alterado não possui um dos campos cadastrado na base",
        };
      }
    }
  }

  throw {
    id: 400,
    message: "Serviço realizado alterado não possui data hora ou id de serviço",
  };
}

async function deletar(idAgendamento, dataHoraServico) {
  const agendamento = await agendamento_repository.deletar(
    idAgendamento,
    dataHoraServico
  );
  if (agendamento) {
    return agendamento;
  } else {
    throw { id: 404, message: "Serviço realizado não encontrado" };
  }
}

module.exports = {
  listar,
  buscarPorId,
  buscarPorData,
  inserir,
  atualizar,
  deletar,
};
