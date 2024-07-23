const agendamento_service = require("./agendamento_service");

test("Function buscarPorId", () => {
  const agendamentoEsperado = {
    idBarbearia: 1,
    idBarbeiro: 1,
    idServico: 1,
    dataHoraServico: "2024-07-07-19:30",
    idAgendamento: "1112024-07-07-19:30",
  };

  return agendamento_service
    .buscarPorId(agendamentoEsperado.idAgendamento)
    .then((resultado) => {
      expect(resultado).toEqual(agendamentoEsperado);
    });
});

test("Função buscarPorData", () => {
  let servicosRealizadosEsperados = [
    {
      idAgendamento: "1112024-07-07-19:30",
      barbearia: {
        idBarbearia: 1,
        nomeBarbearia: "Barbel",
        cnpj: "99.777.777/0001-66",
        horarioAbertura: "08:00",
        horarioFechamento: "18:00",
      },
      barbeiro: {
        idBarbeiro: 1,
        nomeBarbeiro: "Roger",
        cpf: "123.456.789-00",
        telefone: "123456789",
      },
      servico: { idServico: 1, descricaoServico: "Corte simples" },
      valorServico: { idValorServico: "111", valorServico: "20,00" },
    },
    {
      idAgendamento: "1212024-07-07-20:00",
      barbearia: {
        idBarbearia: 1,
        nomeBarbearia: "Barbel",
        cnpj: "99.777.777/0001-66",
        horarioAbertura: "08:00",
        horarioFechamento: "18:00",
      },
      barbeiro: {
        idBarbeiro: 2,
        nomeBarbeiro: "João",
        cpf: "987.654.321-00",
        telefone: "987654321",
      },
      servico: { idServico: 1, descricaoServico: "Corte simples" },
      valorServico: { idValorServico: "121", valorServico: "20,00" },
    },
  ];
  return agendamento_service.buscarPorData("2024-07-07").then((resultado) => {
    expect(resultado).toEqual(servicosRealizadosEsperados);
  });
});

// test("Function inserir", () => {
//   const agendamentoInserido = {
//     idBarbearia: 1,
//     idBarbeiro: 2,
//     idServico: 1,
//     dataHoraServico: "2024-07-09-09:35",
//   };

//   const agendamentoInseridoEsperado = {
//     idBarbearia: 1,
//     idBarbeiro: 2,
//     idServico: 1,
//     dataHoraServico: "2024-07-09-09:35",
//     idAgendamento: "1212024-07-09-09:35",
//   };

//   const idAgendamento = `${agendamentoInseridoEsperado.idBarbearia}${agendamentoInseridoEsperado.idBarbeiro}${agendamentoInseridoEsperado.idServico}${agendamentoInseridoEsperado.dataHoraServico}`;

//   agendamento_service
//     .inserir(agendamentoInserido)
//     .then(() => agendamento_service.buscarPorId(idAgendamento))
//     .then((agendamento) => {
//       expect(agendamento).toEqual(agendamentoInseridoEsperado);
//     });
// });

// test("Função atualizar", () => {
//   let casoFuncional = {
//     servicoAAtualizar: {
//       idBabearia: 1,
//       idBarbeiro: 2,
//       idServico: 1,
//       dataHoraServico: "2024-07-07-20:00",
//     },
//     servicoAtualizado: {
//       idBabearia: 1,
//       idBarbeiro: 1,
//       idServico: 1,
//       dataHoraServico: "2024-07-07-14:00",
//     },
//   };

//   agendamento_service.atualizar(
//     casoFuncional.servicoAAtualizar.idBabearia,
//     casoFuncional.servicoAAtualizar.idBarbeiro,
//     casoFuncional.servicoAAtualizar.idServico,
//     casoFuncional.servicoAAtualizar.dataHoraServico,
//     casoFuncional.servicoAtualizado
//   );

//   expect(
//     agendamento_service.buscarPorKeyTabela(
//       casoFuncional.servicoAtualizado.idBabearia,
//       casoFuncional.servicoAtualizado.idBarbeiro,
//       casoFuncional.servicoAtualizado.idServico,
//       casoFuncional.servicoAtualizado.dataHoraServico
//     )
//   ).toEqual(casoFuncional.servicoAtualizado);

//   // Fora de hora
//   let casoFalho = {
//     servicoAAtualizar: {
//       idBabearia: 1,
//       idBarbeiro: 1,
//       idServico: 1,
//       dataHoraServico: "2024-07-07-19:30",
//     },
//     servicoAtualizado: {
//       idBabearia: 1,
//       idBarbeiro: 1,
//       idServico: 1,
//       dataHoraServico: "2024-07-07-19:40",
//     },
//   };

//   expect(() =>
//     agendamento_service.atualizar(
//       casoFalho.servicoAAtualizar.idBabearia,
//       casoFalho.servicoAAtualizar.idBarbeiro,
//       casoFalho.servicoAAtualizar.idServico,
//       casoFalho.servicoAAtualizar.dataHoraServico,
//       casoFalho.servicoAtualizado
//     )
//   ).toThrow();

//   // Não localizado
//   let casoFalho2 = {
//     servicoAAtualizar: {
//       idBabearia: 1,
//       idBarbeiro: 1,
//       idServico: 1,
//       dataHoraServico: "2025-07-07-19:30",
//     },
//     servicoAtualizado: {
//       idBabearia: 1,
//       idBarbeiro: 1,
//       idServico: 1,
//       dataHoraServico: "2025-07-07-13:40",
//     },
//   };

//   expect(() =>
//     agendamento_service.atualizar(
//       casoFalho2.servicoAAtualizar.idBabearia,
//       casoFalho2.servicoAAtualizar.idBarbeiro,
//       casoFalho2.servicoAAtualizar.idServico,
//       casoFalho2.servicoAAtualizar.dataHoraServico,
//       casoFalho2.servicoAtualizado
//     )
//   ).toThrow();

//   // Já existente
//   let casoFalho3 = {
//     servicoAAtualizar: {
//       idBabearia: 1,
//       idBarbeiro: 1,
//       idServico: 1,
//       dataHoraServico: "2024-07-08-19:30",
//     },
//     servicoAtualizado: {
//       idBabearia: 1,
//       idBarbeiro: 1,
//       idServico: 1,
//       dataHoraServico: "2024-07-07-14:00",
//     },
//   };

//   expect(() =>
//     agendamento_service.atualizar(
//       casoFalho3.servicoAAtualizar.idBabearia,
//       casoFalho3.servicoAAtualizar.idBarbeiro,
//       casoFalho3.servicoAAtualizar.idServico,
//       casoFalho3.servicoAAtualizar.dataHoraServico,
//       casoFalho3.servicoAtualizado
//     )
//   ).toThrow();

//   //Fração faltando
//   let casoFalho4 = {
//     servicoAAtualizar: {
//       idBabearia: 1,
//       idBarbeiro: 1,
//       idServico: 1,
//       dataHoraServico: "2024-07-08-19:30",
//     },
//     servicoAtualizado: {
//       idBabearia: 1,
//       idBarbeiro: 1,
//       dataHoraServico: "2024-07-08-19:30",
//     },
//   };

//   expect(() =>
//     agendamento_service.atualizar(
//       casoFalho4.servicoAAtualizar.idBabearia,
//       casoFalho4.servicoAAtualizar.idBarbeiro,
//       casoFalho4.servicoAAtualizar.idServico,
//       casoFalho4.servicoAAtualizar.dataHoraServico,
//       casoFalho4.servicoAtualizado
//     )
//   ).toThrow();

//     //Fração id servico inexistente
//     let casoFalho5 = {
//       servicoAAtualizar: {
//         idBabearia: 1,
//         idBarbeiro: 1,
//         idServico: 1,
//         dataHoraServico: "2024-07-08-19:30",
//       },
//       servicoAtualizado: {
//         idBabearia: 1,
//         idBarbeiro: 1,
//         idServico: 8,
//         dataHoraServico: "2024-07-08-19:30",
//       },
//     };

//     expect(() =>
//       agendamento_service.atualizar(
//         casoFalho5.servicoAAtualizar.idBabearia,
//         casoFalho5.servicoAAtualizar.idBarbeiro,
//         casoFalho5.servicoAAtualizar.idServico,
//         casoFalho5.servicoAAtualizar.dataHoraServico,
//         casoFalho5.servicoAtualizado
//       )
//     ).toThrow();
// });

// test("Function deletar", () => {
//   let casoFuncional = {
//     idBabearia: 1,
//     idBarbeiro: 2,
//     idServico: 1,
//     dataHoraServico: "2024-07-09-09:30",
//   };

//   agendamento_service.deletar(
//     casoFuncional.idBabearia,
//     casoFuncional.idBarbeiro,
//     casoFuncional.idServico,
//     casoFuncional.dataHoraServico
//   );

//   expect(() =>
//     agendamento_service.buscarPorKeyTabela(
//       casoFuncional.idBabearia,
//       casoFuncional.idBarbeiro,
//       casoFuncional.idServico,
//       casoFuncional.dataHoraServico
//     )
//   ).toThrow();

//   let casoFalho = {
//     idBabearia: 1,
//     idBarbeiro: 2,
//     idServico: 8,
//     dataHoraServico: "2024-07-09-09:30",
//   };
//   expect(() =>
//     agendamento_service.deletar(
//       casoFalho.idBabearia,
//       casoFalho.idBarbeiro,
//       casoFalho.idServico,
//       casoFalho.dataHoraServico
//     )
//   ).toThrow();
// });
