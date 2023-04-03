const Services = require('./Services');
const database = require('../models')

class PessoasServices extends Services{
    constructor(){
        super('Pessoas');
        this.matriculas = new Services('Matriculas');
    }

    async pegaTodosOsRegistrosAtivos(where = {}){
        return database[this.nomeDoModelo].findAll(where = {...where});
    }

    async pegaTodosOsRegistros(where = {}){
        return database[this.nomeDoModelo].scope('todas').findAll(where = {...where});
    }

    async cancelaPessoaEMatriculas(estudanteId){
        return database.sequelize.transaction(async transacao => {
            await super.atualizaRegistro({ativo: 'false'}, estudanteId, {transaction: transacao});
            await this.matriculas.atualizaRegistros({status: 'cancelado'}, {estudante_id: estudanteId}, {transaction: transacao});
        });
    }
}

module.exports = PessoasServices;