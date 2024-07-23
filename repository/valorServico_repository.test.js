const valorservico_repository = require("./valorServico_repository");

test("Function buscarPorId", () => {
    let valorServicoEsperado = {
        idValorServico: "111",
        idBarbearia: 1,
        idBarbeiro: 1,
        idServico: 1,
        valorServico: "20,00"
      };
  
    return valorservico_repository.buscarPorId('111').then((resultado) => {
      expect(resultado).toEqual(valorServicoEsperado);
    });
  });
