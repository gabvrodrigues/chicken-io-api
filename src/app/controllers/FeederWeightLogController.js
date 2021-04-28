const { FeederWeightLogs } = require('../models');
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

        if (periodType === 'all_data') {
            const log = await FeederWeightLogs.findAll({
                attributes: [
                    'food_amount',
                    'food_amount_at_end',
                    'timestamp',
                ],
                order: [
                    [`timestamp`, 'ASC']
                ],
                where: {
                    chicken_id: id,
                    ...whereObject
                }
            });
            return res.status(200).json({
                values: {
                    'food_amount': log.map((el) => el['food_amount'].toFixed(2)),
                    'food_ate': log.map((el) => el['food_amount'].toFixed(2) - el['food_amount_at_end'].toFixed(2)),
                    'food_amount_at_end': log.map((el) => el['food_amount_at_end'].toFixed(2))
                },
                timestamp: log.map((el) => moment(el.timestamp).format("DD/MM/YYYY HH:mm"))
            });
        }
        else if (periodType === 'daily_avg') {
            const log = await FeederWeightLogs.findAll({
                attributes: [
                    [sequelize.literal(`AVG(food_amount)`), 'food_amount'],
                    [sequelize.literal(`AVG(food_amount_at_end)`), 'food_amount_at_end'],
                    [sequelize.literal(`DATE("timestamp")`), 'timestamp']
                ],
                group: [sequelize.literal(`DATE("timestamp")`)],
                order: [
                    [sequelize.literal(`DATE("timestamp")`), 'ASC']
                ],
                where: { chicken_id: id, ...whereObject }
            });
            return res.status(200).json({
                values: {
                    'food_amount': log.map((el) => el['food_amount'].toFixed(2)), 
                    'food_ate': log.map((el) => el['food_amount'].toFixed(2) - el['food_amount_at_end'].toFixed(2)), 
                    'food_amount_at_end': log.map((el) => el['food_amount_at_end'].toFixed(2))
                },
                timestamp: log.map((el) => moment(el.timestamp).format("DD/MM/YYYY"))
            });
        }
    }
    catch (e) {
        console.log(e)
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
                    [sequelize.Op.between]: [startDate, endDate]
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