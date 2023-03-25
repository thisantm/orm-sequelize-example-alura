const { Router } = require('express');
const PessoaController = require('../controllers/PessoasController.js');

const router = Router();

// pessoas
// get
router.get('/pessoas/todas', PessoaController.pegaTodasAsPessoas);
router.get('/pessoas', PessoaController.pegaPessoasAtivas);
router.get('/pessoas/:id', PessoaController.pegaUmaPessoa);
//post
router.post('/pessoas', PessoaController.criaPessoa);
router.post('/pessoas/:id/restaura', PessoaController.restauraPessoa);
//put
router.put('/pessoas/:id', PessoaController.atualizaPessoa);
//delete
router.delete('/pessoas/:id', PessoaController.apagaPessoa);

// matriculas
// get
router.get('/pessoas/:estudanteId/matricula', PessoaController.pegaMatriculasAtivas);
router.get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.pegaUmaMatricula);
router.get('/pessoas/matricula/:turmaId/confirmadas', PessoaController.pegaMatriculasPorTurma);
router.get('/pessoas/matricula/lotada', PessoaController.pegaTurmasLotadas);
//post
router.post('/pessoas/:estudanteId/matricula', PessoaController.criaMatricula);
router.post('/pessoas/:estudanteId/matricula/:matriculaId/restaura', PessoaController.restauraMatricula);
//put
router.put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.atualizaMatricula);
//delete
router.delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.apagaMatricula);

module.exports = router;