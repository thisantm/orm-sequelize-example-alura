// const database = require('../models');

const Service = require('../services/Services');
const niveisServices = new Service('Niveis');

class NivelController {
    static async pegaTodosOsNiveis(req, res) {
        try {
        const todosOsNiveis = await niveisServices.pegaTodosOsRegistros();
        return res.status(200).json(todosOsNiveis);
        } catch (error) {
        return res.status(500).json(error.message);
        }
    }

    static async pegaUmNivel(req,res){
        try{
            const {id} = req.params;
            const umNivel = await niveisServices.pegaUmRegistro(Number(id));
            return res.status(200).json(umNivel);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async criaNivel(req,res){
        const novoNivel = req.body;
        try{
            const novoNivelCriado = await niveisServices.criaRegistro(novoNivel);
            return res.status(200).json(novoNivelCriado);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async atualizaNivel(req,res){
        const {id} = req.params;
        const novasInfos = req.body;
        try{
            await niveisServices.atualizaRegistro(novasInfos,Number(id));
            const NivelAtualizado = await niveisServices.pegaUmRegistro(Number(id));
            return res.status(200).json(NivelAtualizado);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async apagaNivel(req,res){
        const {id} = req.params;
        try{
            await niveisServices.apagaRegistro(Number(id));
            return res.status(200).json({message : `id ${id} foi deletado com sucesso`});
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async restauraNivel(req,res){
        const {id} = req.params;
        try{
            await niveisServices.restauraRegistro(Number(id));
            return res.status(200).json({message : `id ${id} foi restaurado com sucesso`});
        }catch(error){
            return res.status(500).json(error.message);
        }
    }
}

module.exports = NivelController;