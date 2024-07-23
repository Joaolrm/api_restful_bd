const servico_repository = require("./servico_repository");

test("Function buscarPorId", () => {
    let servicoEsperado = {
        idservico: 1,
        descricaoservico: "Corte simples",
      };
  
    return servico_repository.buscarPorId(1).then((resultado) => {
      expect(resultado).toEqual(servicoEsperado);
    });
  });
