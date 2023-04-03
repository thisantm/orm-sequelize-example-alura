// const database = require('../models');

const { TurmasServices } = require('../services');
const turmasServices = new TurmasServices();
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

        const todasAsTurmas = await turmasServices.pegaTodosOsRegistros(where);
        return res.status(200).json(todasAsTurmas);
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }

    static async pegaUmaTurma(req,res){
        try{
            const {id} = req.params;
            const umaTurma = await turmasServices.pegaUmRegistro(Number(id));
            return res.status(200).json(umaTurma);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    // criadores
    static async criaTurma(req,res){
        const novaTurma = req.body;
        try{
            const novaTurmaCriada = await turmasServices.criaRegistro(novaTurma);
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
            await turmasServices.atualizaRegistro(novasInfos,Number(id));
            const TurmaAtualizada = await turmasServices.pegaUmRegistro(Number(id));
            return res.status(200).json(TurmaAtualizada);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    // deletadores
    static async apagaTurma(req,res){
        const {id} = req.params;
        try{
            await turmasServices.apagaRegistro(Number(id));
            return res.status(200).json({message : `id ${id} foi deletado com sucesso`});
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    // restauradores
    static async restauraTurma(req,res){
        const {id} = req.params;
        try{
            await turmasServices.restauraRegistro(Number(id));
            return res.status(200).json({message : `id ${id} foi restaurado com sucesso`});
        }catch(error){
            return res.status(500).json(error.message);
        }
    }
}

module.exports = TurmaController;