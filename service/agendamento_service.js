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
  let barbearia = await barbearia_repository.buscarPorId(
    agendamento.idBarbearia
  );
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
      if (
        agendamento &&
        agendamento.idBarbearia &&
        agendamento.idBarbeiro &&
        agendamento.idServico &&
        agendamento.dataHoraServico &&
        servico_repository.buscarPorId(agendamento.idServico) &&
        barbeiro_repository.buscarPorId(agendamento.idBarbeiro) &&
        barbearia_repository.buscarPorId(agendamento.idBabearia)
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

// function atualizar(
//   idBabearia,
//   idBarbeiro,
//   idServico,
//   dataHoraServico,
//   agendamentoAlterado
// ) {
//   let horarioFuncionamentoBarbearia = {
//     abertura: barbearia_repository.buscarPorId(
//       agendamentoAlterado.idBabearia
//     ).horarioAbertura,
//     fechamento: barbearia_repository.buscarPorId(
//       agendamentoAlterado.idBabearia
//     ).horarioFechamento,
//   };

//   let horaMinAgendamento =
//     agendamentoAlterado.dataHoraServico.substring(11);

//   if (
//     agendamentoAlterado &&
//     agendamentoAlterado.idBabearia &&
//     agendamentoAlterado.idBarbeiro &&
//     agendamentoAlterado.idServico &&
//     agendamentoAlterado.dataHoraServico
//   ) {
//     if (
//       agendamento_repository.buscarPorKeyTabela(
//         agendamentoAlterado.idBabearia,
//         agendamentoAlterado.idBarbeiro,
//         agendamentoAlterado.idServico,
//         agendamentoAlterado.dataHoraServico
//       )
//     ) {
//       throw {
//         id: 400,
//         message:
//           "Já existe um serviço realizado identico a tentativa de alteração",
//       };
//     } else {
//       if (
//         servico_repository.buscarPorId(agendamentoAlterado.idServico) &&
//         barbeiro_repository.buscarPorId(agendamentoAlterado.idBarbeiro) &&
//         barbearia_repository.buscarPorId(agendamentoAlterado.idBabearia)
//       ) {
//         if (
//           horaMinAgendamento > horarioFuncionamentoBarbearia.abertura &&
//           horaMinAgendamento < horarioFuncionamentoBarbearia.fechamento
//         ) {
//           agendamentoAlterado = agendamento_repository.atualizar(
//             idBabearia,
//             idBarbeiro,
//             idServico,
//             dataHoraServico,
//             agendamentoAlterado
//           );
//           if (agendamentoAlterado) {
//             return agendamentoAlterado;
//           } else {
//             throw { id: 404, message: "Chave composta não localizada" };
//           }
//         } else {
//           throw {
//             id: 422,
//             message:
//               "Serviço realizado não pode ser inserido fora do horário de funcionamento da barbearia",
//           };
//         }
//       } else {
//         throw {
//           id: 400,
//           message:
//             "Serviço realizado alterado não possui um id de serviço cadastrado na base",
//         };
//       }
//     }
//   }

//   throw {
//     id: 400,
//     message: "Serviço realizado alterado não possui data hora ou id de serviço",
//   };
// }

// function deletar(idBabearia, idBarbeiro, idServico, dataHoraServico) {
//   const agendamento = agendamento_repository.deletar(
//     idBabearia,
//     idBarbeiro,
//     idServico,
//     dataHoraServico
//   );
//   if (agendamento) {
//     return agendamento;
//   } else {
//     throw { id: 404, message: "Serviço realizado não encontrado" };
//   }
// }

module.exports = {
  listar,
  buscarPorId,
  buscarPorData,
  inserir,
  // atualizar,
  // deletar,
};
