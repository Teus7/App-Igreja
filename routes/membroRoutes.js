const express = require('express');
const router = express.Router();
const membroController = require('../controllers/membroController');

router.get('/membros', membroController.listarMembros);
router.post('/membros', membroController.cadastrarMembro);
router.put('/membros/:id', membroController.atualizarMembro);
router.delete('/membros/:id', membroController.deletarMembro);
router.get('/aniversariantes', membroController.listarAniversariantes);

module.exports = router;