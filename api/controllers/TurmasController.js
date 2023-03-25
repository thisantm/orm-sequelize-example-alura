const database = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

class TurmaController {

    // consultores
    static async pegaTodasAsTurmas(req, res) {
      try {
        const {data_inicial, data_final} = req.query
        
        const where = {};
        data_inicial || data_final ? where.data_inicio = {} : null;
        data_inicial ? where.data_inicio[Op.gte] = data_inicial : null;
        data_final ? where.data_inicio[Op.lte] = data_final : null;

        const todasAsTurmas = await database.Turmas.findAll({where})
        return res.status(200).json(todasAsTurmas);
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }

    static async pegaUmaTurma(req,res){
        try{
            const {id} = req.params;
            const umaTurma = await database.Turmas.findOne(
                {where : 
                    {id : Number(id)}
                });
            return res.status(200).json(umaTurma);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    // criadores
    static async criaTurma(req,res){
        const novaTurma = req.body;
        try{
            const novaTurmaCriada = await database.Turmas.create(novaTurma);
            return res.status(200).json(novaTurmaCriada);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    // atualizadores
    static async atualizaTurma(req,res){
        const {id} = req.params;
        const novasInfos = req.body;
        try{
            await database.Turmas.update(novasInfos, 
                {where : 
                    {id : Number(id)}
                });

            const TurmaAtualizada = await database.Turmas.findOne(
                {where : 
                    {id : Number(id)}
                });
            return res.status(200).json(TurmaAtualizada);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    // deletadores
    static async apagaTurma(req,res){
        const {id} = req.params;
        try{
            await database.Turmas.destroy(
                {where : 
                    {id : Number(id)}
                });
            return res.status(200).json({message : `id ${id} foi deletado com sucesso`});
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    // restauradores
    static async restauraTurma(req,res){
        const {id} = req.params;
        try{
            await database.Turmas.restore(
                {where : 
                    {id : Number(id)}
                });
            return res.status(200).json({message : `id ${id} foi restaurado com sucesso`});
        }catch(error){
            return res.status(500).json(error.message);
        }
    }
}

module.exports = TurmaController;