const { Router } = require('express');
const NiveisController = require('../controllers/NiveisController.js');

const router = Router();

// get
router.get('/niveis', NiveisController.pegaTodosOsNiveis);
router.get('/niveis/:id', NiveisController.pegaUmNivel);
// post
router.post('/niveis', NiveisController.criaNivel);
router.post('/niveis/:id/restaura', NiveisController.restauraNivel);
// put
router.put('/niveis/:id', NiveisController.atualizaNivel);
// delete
router.delete('/niveis/:id', NiveisController.apagaNivel);

module.exports = router;