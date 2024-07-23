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

// test("Função inserir", () => {
//   let casoFuncional = {
//     idBabearia: 1,
//     idBarbeiro: 2,
//     idServico: 1,
//     dataHoraServico: "2024-07-09-09:30",
//   };
//   let casosFalhos = [
//     // Serviço inválido
//     {
//       idBabearia: 1,
//       idBarbeiro: 2,
//       idServico: 8,
//       dataHoraServico: "2024-07-09-10:30",
//     },

//     // Dado faltando
//     {
//       idBabearia: 1,
//       idBarbeiro: 2,
//       idServico: 1,
//     },

//     // Repetido
//     {
//       idBabearia: 1,
//       idBarbeiro: 2,
//       idServico: 1,
//       dataHoraServico: "2024-07-09-09:30",
//     },

//     // Fora do horário de funcionamento
//     {
//       idBabearia: 1,
//       idBarbeiro: 2,
//       idServico: 1,
//       dataHoraServico: "2024-07-09-06:00",
//     },
//   ];

//   servicoRealizado_service.inserir(casoFuncional);
//   expect(servicoRealizado_service.listar()).toContainEqual(casoFuncional);

//   for (index in casosFalhos) {
//     expect(() =>
//       servicoRealizado_service.inserir(casosFalhos[index])
//     ).toThrow();
//   }
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

//   servicoRealizado_service.atualizar(
//     casoFuncional.servicoAAtualizar.idBabearia,
//     casoFuncional.servicoAAtualizar.idBarbeiro,
//     casoFuncional.servicoAAtualizar.idServico,
//     casoFuncional.servicoAAtualizar.dataHoraServico,
//     casoFuncional.servicoAtualizado
//   );

//   expect(
//     servicoRealizado_service.buscarPorKeyTabela(
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
//     servicoRealizado_service.atualizar(
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
//     servicoRealizado_service.atualizar(
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
//     servicoRealizado_service.atualizar(
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
//     servicoRealizado_service.atualizar(
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
//       servicoRealizado_service.atualizar(
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

//   servicoRealizado_service.deletar(
//     casoFuncional.idBabearia,
//     casoFuncional.idBarbeiro,
//     casoFuncional.idServico,
//     casoFuncional.dataHoraServico
//   );

//   expect(() =>
//     servicoRealizado_service.buscarPorKeyTabela(
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
//     servicoRealizado_service.deletar(
//       casoFalho.idBabearia,
//       casoFalho.idBarbeiro,
//       casoFalho.idServico,
//       casoFalho.dataHoraServico
//     )
//   ).toThrow();
// });
