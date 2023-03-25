const database = require('../models');
const Sequelize = require('sequelize');

class PessoaController{
    // pessoas
    // consultores
    static async pegaTodasAsPessoas(req,res){
        try{
            const todasAsPessoas = await database.Pessoas.scope('todas').findAll();
            return res.status(200).json(todasAsPessoas);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async pegaPessoasAtivas(req,res){
        try{
            const todasAsPessoas = await database.Pessoas.findAll();
            return res.status(200).json(todasAsPessoas);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async pegaUmaPessoa(req,res){
        try{
            const {id} = req.params;
            const umaPessoa = await database.Pessoas.findOne(
                {where : 
                    {id : Number(id)}
                });
            return res.status(200).json(umaPessoa);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    //criadores
    static async criaPessoa(req,res){
        const novaPessoa = req.body;
        try{
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa);
            return res.status(200).json(novaPessoaCriada);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    //atualizadores
    static async atualizaPessoa(req,res){
        const {id} = req.params;
        const novasInfos = req.body;
        try{
            await database.Pessoas.update(novasInfos, 
                {where : 
                    {id : Number(id)}
                });

            const pessoaAtualizada = await database.Pessoas.findOne(
                {where : 
                    {id : Number(id)}
                });
            return res.status(200).json(pessoaAtualizada);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    // deletadores
    static async apagaPessoa(req,res){
        const {id} = req.params;
        try{
            await database.Pessoas.destroy(
                {where : 
                    {id : Number(id)}
                });
            return res.status(200).json({message : `id ${id} foi deletado com sucesso`});
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    // restauradores
    static async restauraPessoa(req,res){
        const {id} = req.params;
        try{
            await database.Pessoas.restore(
                {where : 
                    {id : Number(id)}
                });
            return res.status(200).json({message : `id ${id} foi restaurado com sucesso`});
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    // matriculas
    // consultores
    static async pegaMatriculasAtivas(req,res){
        try{
            const {estudanteId} = req.params;
            const pessoa = await database.Pessoas.findOne({
                where: {
                    id : Number(estudanteId)
                }
            })
            const matriculas = await pessoa.getAulasMatriculadas();
            return res.status(200).json(matriculas);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async pegaUmaMatricula(req,res){
        try{
            const {estudanteId, matriculaId} = req.params;
            const umaMatricula = await database.Matriculas.findOne({
                where : {
                        id : Number(matriculaId),
                        estudante_id: Number(estudanteId)
                    }
                });
            return res.status(200).json(umaMatricula);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async pegaMatriculasPorTurma(req,res){
        try{
            const {turmaId} = req.params;
            const nMatriculasPorTurma = await database.Matriculas.findAndCountAll({
                where : {
                        turma_id : Number(turmaId),
                        status: 'confirmado'
                    }
                });
            return res.status(200).json(nMatriculasPorTurma);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async pegaTurmasLotadas(req,res){
        const lotacaoTurma = 2;
        try{
            const turmasLotadas = await database.Matriculas
            .findAndCountAll({
                where : {
                        status: 'confirmado'
                    },
                attributes: ['turma_id'],
                group: ['turma_id'],
                having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
                });
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
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula);
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
            await database.Matriculas.update(novasInfos, 
                {where : 
                    {
                        id : Number(matriculaId),
                        estudante_id: Number(estudanteId)
                    }
                });

            const matriculaAtualizada = await database.Matriculas.findOne(
                {where : 
                    {
                        id : Number(matriculaId),
                        estudante_id: Number(estudanteId)
                    }
                });
            return res.status(200).json(matriculaAtualizada);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    // deletadores
    static async apagaMatricula(req,res){
        const {estudanteId, matriculaId} = req.params;
        try{
            await database.Matriculas.destroy(
                {where : 
                    {
                        id : Number(matriculaId),
                        estudante_id: Number(estudanteId)
                    }
                });
            return res.status(200).json({message : `id ${matriculaId} foi deletado com sucesso`});
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    // restauradores
    static async restauraMatricula(req,res){
        const {estudanteId, matriculaId} = req.params;
        try{
            await database.Matriculas.restore(
                {where : 
                    {
                        id : Number(matriculaId),
                        estudante_id: Number(estudanteId)
                    }
                });
            return res.status(200).json({message : `id ${matriculaId} foi restaurado com sucesso`});
        }catch(error){
            return res.status(500).json(error.message);
        }
    }
}

module.exports = PessoaController;