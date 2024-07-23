const express = require("express");
const router = express.Router();

const servicoRealizado_controller = require("../controller/servicoRealizado_controller");

router.get("/", servicoRealizado_controller.listar);
router.post("/", servicoRealizado_controller.inserir);
router.put("/:idAgendamento", servicoRealizado_controller.atualizar);
router.get("/:idAgendamento", servicoRealizado_controller.buscarPorKeyTabela);
router.get("/:data", servicoRealizado_controller.buscarPorData);
router.delete("/:idAgendamento", servicoRealizado_controller.deletar);

module.exports = router;
