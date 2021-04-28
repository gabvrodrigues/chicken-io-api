const { Chickens } = require('../models');
const { FeederWeightLogs } = require('../models');
const { Tags } = require('../models');
const { Users } = require('../models');
const { Op } = require("sequelize");
var moment = require('moment-timezone');

const get = async (req, res, next) => {
    try {
        const tagCode = req.params.tagCode;
        if (tagCode) {
            const chicken = await Chickens.findAll({
                include: [
                    { model: Tags, where: { tag_code: tagCode } }
                ]
            });
            return res.status(200).json(...chicken);
        }
        const chickens = await Chickens.findAll({
            include: [
                { model: Tags }
            ]
        });
        return res.status(200).json({ chickens });
    }
    catch (e) {
        console.error(e)
        return res.status(500).json({ message: 'Erro ao carregar informações das galinhas' })
    }
};

const getCanEat = async (req, res, next) => {
    try {
        const tagCode = req.params.tagCode;
        const startDate = moment().startOf('day').format("YYYY-MM-DD HH:mm:ss");
        const endDate = moment().endOf('day').format("YYYY-MM-DD HH:mm:ss");

        const chicken = await Chickens.findAll({
            attributes: ['id', 'meals_per_day', 'meals_interval'],
            include: [
                { model: Tags, where: { tag_code: tagCode } }
            ]
        });
        const mealsAtDay = await FeederWeightLogs.count({
            where: {
                timestamp: {
                    [Op.between]: [startDate, endDate]
                },
                chicken_id: chicken.map((el) => el.id)
            }
        });

        const lastMealTime = await FeederWeightLogs.max('timestamp', {
            where: {
                chicken_id: chicken.map((el) => el.id)
            }
        });

        // const canEatInterval = moment(lastMealTime).add(chicken.map((el) => el.meals_interval), 'hours') <= moment()
        let nextMealNumber = 0;
        if (mealsAtDay < chicken.map(el => el.meals_per_day)) {
            nextMealNumber = mealsAtDay + 1
        }
        return res.status(200).json({ nextMealNumber: nextMealNumber });
    }
    catch (e) {
        console.error(e)
        return res.status(500).json({ message: 'Erro ao carregar dados da galinha' });
    }
};

const create = async (req, res, next) => {
    try {
        await Chickens.create(req.body);
        return res.status(201).json({ message: 'Galinha criada com sucesso!' });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Erro ao criar galinha!' + e });
    }
};
const update = async (req, res, next) => {
    try {
        let id = req.params.id;
        const newChicken = req.body;
        const chicken = await Chickens.findByPk(id);
        await chicken.update(newChicken);
        return res.status(201).json({ message: 'Galinha atualizada com sucesso!' });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Erro ao atualizar galinha!' })
    }
};

const destroy = async (req, res, next) => {
    try {
        const id = req.params.id;
        const chicken = await Chickens.findByPk(id);
        chicken.destroy();
        await Tags.update({ is_using: false }, { where: { id: chicken.tag_id } })
        return res.status(200).json({ message: `Galinha excluída com sucesso!` });
    }
    catch (e) {
        return res.status(500).json({ message: 'Erro ao excluir galinha' });
    }
};
const testConnection = async (req, res, next) => {
    try {
        await Users.findAll({ limit: 1 });
        return res.status(200).json({ message: `Conexão estabelecida` });
    }
    catch (e) {
        return res.status(500).json({ message: `Erro estabelecer conexão` });
    }
}

module.exports = {
    create,
    update,
    destroy,
    get,
    getCanEat,
    testConnection
}