const { Router } = require('express');
const PessoaController = require('../controllers/PessoasController.js');
const MatriculasController = require('../controllers/MatriculasController.js');

const router = Router();

// pessoas
// get
router.get('/pessoas/todas', PessoaController.pegaTodasAsPessoas);
router.get('/pessoas', PessoaController.pegaPessoasAtivas);
router.get('/pessoas/:id', PessoaController.pegaUmaPessoa);
//post
router.post('/pessoas', PessoaController.criaPessoa);
router.post('/pessoas/:id/restaura', PessoaController.restauraPessoa);
router.post('/pessoas/:estudanteId/cancela', PessoaController.cancelaPessoa);
//put
router.put('/pessoas/:id', PessoaController.atualizaPessoa);
//delete
router.delete('/pessoas/:id', PessoaController.apagaPessoa);

// matriculas
// get
router.get('/pessoas/:estudanteId/matricula', MatriculasController.pegaMatriculasAtivas);
router.get('/pessoas/:estudanteId/matricula/:matriculaId', MatriculasController.pegaUmaMatricula);
router.get('/pessoas/matricula/:turmaId/confirmadas', MatriculasController.pegaMatriculasPorTurma);
router.get('/pessoas/matricula/lotada', MatriculasController.pegaTurmasLotadas);
//post
router.post('/pessoas/:estudanteId/matricula', MatriculasController.criaMatricula);
router.post('/pessoas/:estudanteId/matricula/:matriculaId/restaura', MatriculasController.restauraMatricula);
//put
router.put('/pessoas/:estudanteId/matricula/:matriculaId', MatriculasController.atualizaMatricula);
//delete
router.delete('/pessoas/:estudanteId/matricula/:matriculaId', MatriculasController.apagaMatricula);

module.exports = router;