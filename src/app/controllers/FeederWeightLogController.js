const { FeederWeightLogs } = require('../models');
const { Chickens } = require('../models');
const { Tags } = require('../models');
const { Op } = require("sequelize");
var moment = require('moment-timezone');

const get = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (id) {
            const log = await FeederWeightLogs.findAll({
                where: {
                    chicken_id: id,
                }
            });
            return res.status(200).json({ log });
        }
        const logs = await FeederWeightLogs.findAll();
        return res.status(200).json({ logs });
    }
    catch (e) {
        return res.status(500).json({ message: 'Erro ao carregar informações do comedouro das galinhas' });
    }
};
const foodAmountAtEnd = async (req, res, next) => {
    try {
        const id = req.params.id;
        const feederData = await FeederWeightLogs.findByPk(id);
        await feederData.update(req.body);
        return res.status(201).json({ message: `Comida restante atualizada com sucesso` });

    }
    catch (e) {
        return res.status(500).json({ message: 'Erro ao carregar informações do comedouro das galinhas' });
    }

};
const create = async (req, res, next) => {
    try {
        const tagCode = req.body.tag_code;
        const chicken = await Chickens.findAll({
            attributes: ['id'],
            include: [
                { model: Tags, where: { tag_code: tagCode } }
            ]
        });
        await FeederWeightLogs.create({ chicken_id: chicken.map(el => el.id), ...req.body });
        return res.status(201).json({ message: "Dados do comedouro da galinha cadastrados com sucesso!" });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Erro ao cadastrar dados do comedouro da galinha' });
    }
};

const destroy = async (req, res, next) => {
    try {
        const startDate = moment(req.params.start_date).startOf('day').format("YYYY-MM-DD HH:mm:ss")
            || moment().startOf('day').format("YYYY-MM-DD HH:mm:ss");
        const endDate = moment(req.params.end_date).endOf('day').format("YYYY-MM-DD HH:mm:ss")
            || moment().endOf('day').format("YYYY-MM-DD HH:mm:ss");

        const feederData = await FeederWeightLogs.findAll({
            where: {
                timestamp: {
                    [Op.between]: [startDate, endDate]
                }
            }
        });
        feederData.destroy();
        return res.status(200).json({ message: `Dados do comedouro da galinha excluídos com sucesso!` });
    }
    catch (e) {
        return res.status(500).json({ message: 'Erro ao excluir dados do comedouro' });
    }
};

module.exports = {
    create,
    destroy,
    get,
    foodAmountAtEnd
}