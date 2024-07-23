const valorservico_repository = require("./valorServico_repository");

test("Function buscarPorId", () => {
    let valorServicoEsperado = {
        idvalorservico: "111",
        idbarbearia: 1,
        idbarbeiro: 1,
        idservico: 1,
        valorservico: "20,00"
      };
  
    return valorservico_repository.buscarPorId('111').then((resultado) => {
      expect(resultado).toEqual(valorServicoEsperado);
    });
  });
