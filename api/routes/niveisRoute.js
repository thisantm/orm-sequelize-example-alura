const { Router } = require('express');
const NiveisController = require('../controllers/NiveisController.js');

const router = Router();

router.get('/niveis', NiveisController.pegaTodosOsNiveis);
router.get('/niveis/:id', NiveisController.pegaUmNivel);
router.post('/niveis', NiveisController.criaNivel);
router.put('/niveis/:id', NiveisController.atualizaNivel);
router.delete('/niveis/:id', NiveisController.apagaNivel);

module.exports = router;