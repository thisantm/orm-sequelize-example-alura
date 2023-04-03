// const database = require('../models');
const { MatriculasServices } = require('../services');
const matriculasServices = new MatriculasServices();

const Sequelize = require('sequelize');

class MatriculasController{
    // consultores
    static async pegaMatriculasAtivas(req,res){
        try{
            const {estudanteId} = req.params;
            const matriculas = await matriculasServices.pegaTodosOsRegistros({estudante_id: Number(estudanteId)});
            return res.status(200).json(matriculas);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async pegaUmaMatricula(req,res){
        try{
            const {estudanteId, matriculaId} = req.params;
            const umaMatricula = await matriculasServices.pegaUmRegistro({id : Number(matriculaId), estudante_id: Number(estudanteId)});
            return res.status(200).json(umaMatricula);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async pegaMatriculasPorTurma(req,res){
        try{
            const {turmaId} = req.params;
            const nMatriculasPorTurma = await matriculasServices.contaRegistros(
                {turma_id : Number(turmaId), status: 'confirmado'},
                {limit : 20, order: [['estudante_id', 'DESC']]}
            );
            return res.status(200).json(nMatriculasPorTurma);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async pegaTurmasLotadas(req,res){
        const lotacaoTurma = 2;
        try{
            const turmasLotadas = await matriculasServices.contaRegistros(
                {status: 'confirmado'},
                {
                    attributes: ['turma_id'],
                    group: ['turma_id'],
                    having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
                }
            );
            return res.status(200).json(turmasLotadas.count);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    // criadores
    static async criaMatricula(req,res){
        const {estudanteId} = req.params;
        const novaMatricula = {...req.body, estudante_id : Number(estudanteId)};
        try{
            const novaMatriculaCriada = await matriculasServices.criaRegistro(novaMatricula);
            return res.status(200).json(novaMatriculaCriada);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    // atualizadores
    static async atualizaMatricula(req,res){
        const {estudanteId, matriculaId} = req.params;
        const novasInfos = req.body;
        try{
            await matriculasServices.atualizaRegistro(novasInfos, {id : Number(matriculaId), estudante_id: Number(estudanteId)});
            const matriculaAtualizada = await matriculasServices.pegaUmRegistro({id : Number(matriculaId), estudante_id: Number(estudanteId)});
            return res.status(200).json(matriculaAtualizada);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    // deletadores
    static async apagaMatricula(req,res){
        const {estudanteId, matriculaId} = req.params;
        try{
            await matriculasServices.apagaRegistro({id : Number(matriculaId), estudante_id: Number(estudanteId)});
            return res.status(200).json({message : `id ${matriculaId} foi deletado com sucesso`});
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    // restauradores
    static async restauraMatricula(req,res){
        const {estudanteId, matriculaId} = req.params;
        try{
            await matriculasServices.restauraRegistro({id : Number(matriculaId), estudante_id: Number(estudanteId)});
            return res.status(200).json({message : `id ${matriculaId} foi restaurado com sucesso`});
        }catch(error){
            return res.status(500).json(error.message);
        }
    }
}

module.exports = MatriculasController;