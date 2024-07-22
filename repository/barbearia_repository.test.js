const barbearia_repository = require("./barbearia_repository");

test("Function buscarPorId", () => {
  let barbeariaEsperada = {
    idbarbearia: 1,
    nomebarbearia: "Barbel",
    cnpj: "99.777.777/0001-66",
    horarioabertura: "08:00",
    horariofechamento: "18:00",
  };

  return barbearia_repository.buscarPorId(1).then((resultado) => {
    expect(resultado).toEqual(barbeariaEsperada);
  });
});
