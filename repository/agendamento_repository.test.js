const agendamento_repository = require("./agendamento_repository");

test("Function listar", () => {
  let listaEsperadaDoListar = [
    {
      idBarbearia: 1,
      idBarbeiro: 1,
      idServico: 1,
      dataHoraServico: "2024-07-07-19:30",
      idAgendamento: "1112024-07-07-19:30",
    },
    {
      idBarbearia: 1,
      idBarbeiro: 2,
      idServico: 1,
      dataHoraServico: "2024-07-07-20:00",
      idAgendamento: "1212024-07-07-20:00",
    },
    {
      idBarbearia: 1,
      idBarbeiro: 1,
      idServico: 1,
      dataHoraServico: "2024-07-08-19:30",
      idAgendamento: "1112024-07-08-19:30",
    },
    {
      idBarbearia: 1,
      idBarbeiro: 2,
      idServico: 1,
      dataHoraServico: "2024-07-08-19:30",
      idAgendamento: "1212024-07-08-19:30",
    },
  ];

  return agendamento_repository.listar().then((resultado) => {
    expect(resultado).toEqual(listaEsperadaDoListar);
    expect(resultado).toHaveLength(4);
  });
});

test("Function buscarPorId", () => {
  let agendamentoEsperado = {
    dataHoraServico: "2024-07-07-19:30",
    idAgendamento: "1112024-07-07-19:30",
    idBarbearia: 1,
    idBarbeiro: 1,
    idServico: 1,
  };

  return agendamento_repository
    .buscarPorId("1112024-07-07-19:30")
    .then((resultado) => {
      expect(resultado).toEqual(agendamentoEsperado);
    });
});

test("Function buscarPorData", () => {
  let listaEsperadaBuscarPorData = [
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

  return agendamento_repository
    .buscarPorData("2024-07-07")
    .then((resultado) => {
      expect(resultado).toEqual(listaEsperadaBuscarPorData);
    });
});

test("Function inserir", () => {
  const agendamentoInserido = {
    idBarbearia: 1,
    idBarbeiro: 2,
    idServico: 1,
    dataHoraServico: "2024-07-09-09:30",
  };

  const agendamentoInseridoEsperado = {
    idBarbearia: 1,
    idBarbeiro: 2,
    idServico: 1,
    dataHoraServico: "2024-07-09-09:30",
    idAgendamento: "1212024-07-09-09:30",
  };

  const idAgendamento = `${agendamentoInseridoEsperado.idBarbearia}${agendamentoInseridoEsperado.idBarbeiro}${agendamentoInseridoEsperado.idServico}${agendamentoInseridoEsperado.dataHoraServico}`;

  return agendamento_repository
    .inserir(agendamentoInserido)
    .then(() => agendamento_repository.buscarPorId(idAgendamento))
    .then((agendamento) => {
      expect(agendamento).toEqual(agendamentoInseridoEsperado);
    });
});

test("Function deletar", () => {
  const agendamentoEsperado = {
    idBarbearia: 1,
    idBarbeiro: 2,
    idServico: 1,
    dataHoraServico: "2024-07-08-19:30",
    idAgendamento: "1212024-07-08-19:30",
  };

  return agendamento_repository
    .buscarPorId(agendamentoEsperado.idAgendamento)
    .then((localizar) => {
      expect(localizar).toEqual(agendamentoEsperado);
      return agendamento_repository.deletar(agendamentoEsperado.idAgendamento);
    })
    .then(() =>
      agendamento_repository.buscarPorId(agendamentoEsperado.idAgendamento)
    )
    .then((naoLocalizar) => {
      expect(naoLocalizar).toBeUndefined();
    });
});

test("Function atualizar", () => {
  const agendamentoAAlterar = {
    idBarbearia: 1,
    idBarbeiro: 1,
    idServico: 1,
    dataHoraServico: "2024-07-07-19:30",
    idAgendamento: "1112024-07-07-19:30",
  };

  const agendamentoAlterado = {
    idBarbearia: 1,
    idBarbeiro: 1,
    idServico: 1,
    dataHoraServico: "2024-07-07-19:30",
    idAgendamento: "1112024-07-07-19:30",
  };

  let resultado = agendamento_repository
    .atualizar(agendamentoAAlterar.idAgendamento, agendamentoAlterado)
    .then((resultado) => {
      expect(resultado).toEqual(agendamentoAlterado);

      return agendamento_repository.atualizar(
        agendamentoAlterado.idAgendamento,
        agendamentoAAlterar
      );
    })
    .then((resultado) => {
      expect(resultado).toEqual(agendamentoAAlterar);
    });
});
