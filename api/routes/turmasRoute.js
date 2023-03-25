const { Router } = require('express');
const TurmaController = require('../controllers/TurmasController.js');

const router = Router();

// get
router.get('/turmas', TurmaController.pegaTodasAsTurmas);
router.get('/turmas/:id', TurmaController.pegaUmaTurma);
// post
router.post('/turmas', TurmaController.criaTurma);
router.post('/turmas/:id/restaura', TurmaController.restauraTurma);
// put
router.put('/turmas/:id', TurmaController.atualizaTurma);
// delete
router.delete('/turmas/:id', TurmaController.apagaTurma);

module.exports = router;