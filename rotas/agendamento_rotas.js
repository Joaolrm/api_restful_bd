const express = require("express");
const router = express.Router();

const agendamento_controller = require("../controller/agendamento_controller");

router.get("/", agendamento_controller.listar);
router.post("/", agendamento_controller.inserir);
router.put("/:idAgendamento", agendamento_controller.atualizar);
router.get("/id/:idAgendamento", agendamento_controller.buscarPorId);
router.get("/data/:data", agendamento_controller.buscarPorData);
router.delete("/:idAgendamento", agendamento_controller.deletar);

module.exports = router;
