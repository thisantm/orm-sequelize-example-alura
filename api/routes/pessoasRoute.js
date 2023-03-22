const { Router } = require('express');
const PessoaController = require('../controllers/PessoasController.js');

const router = Router();

// pessoas
router.get('/pessoas', PessoaController.pegaTodasAsPessoas);
router.get('/pessoas/:id', PessoaController.pegaUmaPessoa);
router.post('/pessoas', PessoaController.criaPessoa);
router.put('/pessoas/:id', PessoaController.atualizaPessoa);
router.delete('/pessoas/:id', PessoaController.apagaPessoa);

// matriculas
router.get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.pegaUmaMatricula);
router.post('/pessoas/:estudanteId/matricula', PessoaController.criaMatricula);
router.put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.atualizaMatricula);
router.delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.apagaMatricula);

module.exports = router;