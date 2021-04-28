const { NestWeightLogs } = require('../models');
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
        const eggAmount = await NestWeightLogs.count({
            where: { chicken_id: id, laid_egg: true, }
        });
        if (periodType == 'all_data') {
            const log = await NestWeightLogs.findAll({
                where: {
                    chicken_id: id,
                    laid_egg: true,
                    ...whereObject
                },
                attributes: [
                    'egg_weight',
                    'timestamp'
                ],
                // group: [sequelize.literal(`DATE("timestamp")`)],
                order: [
                    ["timestamp", 'ASC']
                ],
            });
            return res.status(200).json({
                values: { weight: log.map((el) => el.egg_weight.toFixed(2)), quantity: log.map((el) => parseInt(el.egg_weight / 60)) },
                timestamp: log.map((el) => moment(el.timestamp).format("DD/MM/YYYY HH:MM")),
                eggAmount: eggAmount
            });
        }
        else {
            const log = await NestWeightLogs.findAll({
                where: {
                    chicken_id: id,
                    laid_egg: true,
                    ...whereObject
                },
                attributes: [
                    [sequelize.literal(`SUM(egg_weight)`), 'egg_weight'],
                    [sequelize.literal(`DATE("timestamp")`), 'timestamp']
                ],
                group: [sequelize.literal(`DATE("timestamp")`)],
                order: [
                    [sequelize.literal(`DATE("timestamp")`), 'ASC']
                ],
            });
            return res.status(200).json({
                values: { weight: log.map((el) => el.egg_weight.toFixed(2)), quantity: log.map((el) => parseInt(el.egg_weight / 60)) },
                timestamp: log.map((el) => moment(el.timestamp).format("DD/MM/YYYY")),
                eggAmount: eggAmount
            });
        }
    }
    catch (e) {
        return res.status(500).json({ message: 'Erro ao carregar informações dos ovos da galinha' + e });
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
        await NestWeightLogs.create({ chicken_id: chicken.map(el => el.id)[0], ...req.body });
        return res.status(201).json({ message: "Dados do ninho cadastrados com sucesso!" });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Erro ao cadastrar dados da balança da galinha' + e });
    }
};

const destroy = async (req, res, next) => {
    try {
        const startDate = moment(req.params.start_date).startOf('day').format("YYYY-MM-DD HH:mm:ss")
            || moment().startOf('day').format("YYYY-MM-DD HH:mm:ss");
        const endDate = moment(req.params.end_date).endOf('day').format("YYYY-MM-DD HH:mm:ss")
            || moment().endOf('day').format("YYYY-MM-DD HH:mm:ss");

        const feederData = await NestWeightLogs.findAll({
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