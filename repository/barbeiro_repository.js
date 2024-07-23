const dataAccess = require("./data_access");

async function buscarPorId(idBarbeiro) {
  resultSet = dataAccess.queryExec("S", "select * from barbeiro where idbarbeiro = $1", [idBarbeiro]);
  return resultSet;
}

// let barbeiros = [
//     { idBarbeiro: 1, nomeBarbeiro: "Roger", cpf: "123.456.789-00", telefone: "123456789" },
//     { idBarbeiro: 2, nomeBarbeiro: "João", cpf: "987.654.321-00", telefone: "987654321" }
// ];


// function buscarPorCpf(cpf) {
//     return barbeiros.find(barbeiro => barbeiro.cpf === cpf);
// }

// function adicionarBarbeiro(nomeBarbeiro, telefone, cpf) {
//     const novoBarbeiro = {
//         idBarbeiro: barbeiros.length + 1,
//         nomeBarbeiro,
//         telefone,
//         cpf
//     };
//     barbeiros.push(novoBarbeiro);
//     return novoBarbeiro;
// }

// function atualizarBarbeiro(id, nomeBarbeiro, telefone, cpf) {
//     const barbeiroIndex = barbeiros.findIndex(barbeiro => barbeiro.idBarbeiro === id);
//     if (barbeiroIndex === -1) {
//         return null;
//     }
//     const barbeiroAtualizado = { idBarbeiro: id, nomeBarbeiro, telefone, cpf };
//     barbeiros[barbeiroIndex] = barbeiroAtualizado;
//     return barbeiroAtualizado;
// }

// function deletarBarbeiro(id) {
//     const barbeiroIndex = barbeiros.findIndex(barbeiro => barbeiro.idBarbeiro === id);
//     if (barbeiroIndex === -1) {
//         return null;
//     }
//     const barbeiroDeletado = barbeiros.splice(barbeiroIndex, 1)[0];
//     return barbeiroDeletado;
// }

// function listar() {
//     return barbeiros;
// }

module.exports = {
    buscarPorId,
    // buscarPorCpf,
    // adicionarBarbeiro,
    // atualizarBarbeiro,
    // deletarBarbeiro,
    // listar
};
