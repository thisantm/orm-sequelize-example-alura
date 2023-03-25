const database = require('../models');

class NivelController {
    static async pegaTodosOsNiveis(req, res) {
        try {
        const todosOsNiveis = await database.Niveis.findAll()
        return res.status(200).json(todosOsNiveis)
        } catch (error) {
        return res.status(500).json(error.message);
        }
    }

    static async pegaUmNivel(req,res){
        try{
            const {id} = req.params;
            const umNivel = await database.Niveis.findOne(
                {where : 
                    {id : Number(id)}
                });
            return res.status(200).json(umNivel);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async criaNivel(req,res){
        const novoNivel = req.body;
        try{
            const novoNivelCriado = await database.Niveis.create(novoNivel);
            return res.status(200).json(novoNivelCriado);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async atualizaNivel(req,res){
        const {id} = req.params;
        const novasInfos = req.body;
        try{
            await database.Niveis.update(novasInfos, 
                {where : 
                    {id : Number(id)}
                });

            const NivelAtualizado = await database.Niveis.findOne(
                {where : 
                    {id : Number(id)}
                });
            return res.status(200).json(NivelAtualizado);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async apagaNivel(req,res){
        const {id} = req.params;
        try{
            await database.Niveis.destroy(
                {where : 
                    {id : Number(id)}
                });
            return res.status(200).json({message : `id ${id} foi deletado com sucesso`});
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async restauraNivel(req,res){
        const {id} = req.params;
        try{
            await database.Niveis.restore(
                {where : 
                    {id : Number(id)}
                });
            return res.status(200).json({message : `id ${id} foi restaurado com sucesso`});
        }catch(error){
            return res.status(500).json(error.message);
        }
    }
}

module.exports = NivelController;