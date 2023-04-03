const database = require('../models');

class Services{
    constructor(nomeDoModelo){
        this.nomeDoModelo = nomeDoModelo;
    }

    async pegaTodosOsRegistros(where = {}) {
        return database[this.nomeDoModelo].findAll({where: {...where}});
    }

    async pegaUmRegistro(where){
        return database[this.nomeDoModelo].findOne({where: {...where}});
    }

    async criaRegistro(dados){
        return database[this.nomeDoModelo].create(dados);
    }

    async atualizaRegistro(dados, id, transacao = {}){
        return database[this.nomeDoModelo].update(dados, {where: {id: id}}, transacao);
    }

    async atualizaRegistros(dados, where, transacao = {}){
        return database[this.nomeDoModelo].update(dados, {where: {...where}}, transacao);
    }

    async apagaRegistro(id){
        return database[this.nomeDoModelo].destroy({where: {id: id}});
    }

    async restauraRegistro(id){
        return database[this.nomeDoModelo].restore({where: {id: id}});
    }

    async contaRegistros(where = {}, options){
        return database[this.nomeDoModelo].findAndCountAll({where: {...where}, ...options});
    }
}

module.exports = Services;