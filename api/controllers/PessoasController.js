// const database = require('../models');
// const Sequelize = require('sequelize');

const { PessoasServices } = require('../services');
const pessoasServices = new PessoasServices();

class PessoaController{
    // pessoas
    // consultores
    static async pegaTodasAsPessoas(req,res){
        try{
            const todasAsPessoas = await pessoasServices.pegaTodosOsRegistros();
            return res.status(200).json(todasAsPessoas);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async pegaPessoasAtivas(req,res){
        try{
            const todasAsPessoas = await pessoasServices.pegaTodosOsRegistrosAtivos();
            return res.status(200).json(todasAsPessoas);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async pegaUmaPessoa(req,res){
        const {id} = req.params;
        try{
            const umaPessoa = await pessoasServices.pegaUmRegistro(Number(id));
            return res.status(200).json(umaPessoa);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    //criadores
    static async criaPessoa(req,res){
        const novaPessoa = req.body;
        try{
            const novaPessoaCriada = await pessoasServices.criaRegistro(novaPessoa);
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
            await pessoasServices.atualizaRegistro(novasInfos, Number(id));
            const pessoaAtualizada = await pessoasServices.pegaUmRegistro(Number(id));
            return res.status(200).json(pessoaAtualizada);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async cancelaPessoa(req,res){
        const {estudanteId} = req.params;
        try{
            await pessoasServices.cancelaPessoaEMatriculas(Number(estudanteId));
            return res.status(200).json({message : `estudante e matriculas referente a estudante ${estudanteId} canceladas`});
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    // deletadores
    static async apagaPessoa(req,res){
        const {id} = req.params;
        try{
            await pessoasServices.apagaRegistro(Number(id));
            return res.status(200).json({message : `id ${id} foi deletado com sucesso`});
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    // restauradores
    static async restauraPessoa(req,res){
        const {id} = req.params;
        try{
            await pessoasServices.restauraRegistro(Number(id));
            return res.status(200).json({message : `id ${id} foi restaurado com sucesso`});
        }catch(error){
            return res.status(500).json(error.message);
        }
    }
}

module.exports = PessoaController;