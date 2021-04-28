const { ChickenWeightLogs } = require('../models');
const { Chickens } = require('../models');
const { Tags } = require('../models');
const sequelize = require("sequelize");
var moment = require('moment-timezone');

const get = async (req, res, next) => {
    try {
        const id = req.params.id;
        const periodType = req.query.period_type || 'daily_avg';
        const startDate = moment(req.query.start_date).startOf('day').format("YYYY-MM-DD HH:mm:ss");
        const endDate = moment(req.query.end_date).endOf('day').format("YYYY-MM-DD HH:mm:ss");

        let whereObject = {}
        if (req.query.start_date != 'null' && req.query.end_date != 'null') {
            whereObject = {
                timestamp: {
                    [sequelize.Op.between]: [startDate, endDate]
                }
            }
        }

        const currentChickenWeight = await ChickenWeightLogs.findAll({
            where: { chicken_id: id },
            limit: 1,
            order: [['timestamp', 'DESC']]
        });
        if (periodType == 'all_data') {
            const log = await ChickenWeightLogs.findAll({
                where: {
                    chicken_id: id,
                    ...whereObject
                },
                attributes: [
                    'weight',
                    'timestamp'
                ],
                // group: [sequelize.literal(`DATE("timestamp")`)],
                order: [
                    ["timestamp", 'ASC']
                ],
            });
            return res.status(200).json({
                values: log.map((el) => el.weight.toFixed(2)),
                timestamp: log.map((el) => moment(el.timestamp).format("DD/MM/YYYY HH:MM")),
                currentWeight: currentChickenWeight[0]
            });
        }
        else {
            const log = await ChickenWeightLogs.findAll({
                where: {
                    chicken_id: id,
                    ...whereObject
                },
                attributes: [
                    [sequelize.literal(`AVG(weight)`), 'weight'],
                    [sequelize.literal(`DATE("timestamp")`), 'timestamp']
                ],
                group: [sequelize.literal(`DATE("timestamp")`)],
                order: [
                    [sequelize.literal(`DATE("timestamp")`), 'ASC']
                ],
            });
            return res.status(200).json({
                values: log.map((el) => el.weight.toFixed(2)),
                timestamp: log.map((el) => moment(el.timestamp).format("DD/MM/YYYY")),
                currentWeight: currentChickenWeight[0]
            });
        }
    }
    catch (e) {
        return res.status(500).json({ message: 'Erro ao carregar informações balança das galinhas' + e });
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
        await ChickenWeightLogs.create({ chicken_id: chicken.map(el => el.id), ...req.body });
        return res.status(201).json({ message: "Dados da balanca da galinha cadastrados com sucesso!" });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Erro ao cadastrar dados da balança da galinha' });
    }
};

const destroy = async (req, res, next) => {
    try {
        const startDate = moment(req.params.start_date).startOf('day').format("YYYY-MM-DD HH:mm:ss")
            || moment().startOf('day').format("YYYY-MM-DD HH:mm:ss");
        const endDate = moment(req.params.end_date).endOf('day').format("YYYY-MM-DD HH:mm:ss")
            || moment().endOf('day').format("YYYY-MM-DD HH:mm:ss");

        const feederData = await ChickenWeightLogs.findAll({
            where: {
                timestamp: {
                    [sequelize.Op.between]: [startDate, endDate]
                }
            }
        });
        feederData.destroy();
        return res.status(200).json({ message: `Dados da balança da galinha excluídos com sucesso!` });
    }
    catch (e) {
        return res.status(500).json({ message: 'Erro ao excluir dados da balança da galinha' });
    }
};

module.exports = {
    create,
    destroy,
    get,
}