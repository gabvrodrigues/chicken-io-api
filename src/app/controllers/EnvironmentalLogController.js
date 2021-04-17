const { EnvironmentalLogs } = require('./../models');
const sequelize = require("sequelize");
var moment = require('moment-timezone');

const get = async (req, res, next) => {
    const type = req.params.type;
    try {
        const environmentalData = await EnvironmentalLogs.findAll({
            attributes: [
                [sequelize.literal(`AVG(${type})`), type],
                [sequelize.literal(`DATE("timestamp")`), 'timestamp']
            ],
            group: [sequelize.literal(`DATE("timestamp")`)],
            order: [
                [sequelize.literal(`DATE("timestamp")`), 'ASC']
            ],
        });
        return res.status(200).json({
            avg: environmentalData.map((el) => el[type]),
            timestamp: environmentalData.map((el) => moment(el.timestamp).format("DD/MM/YYYY"))
        });
    }
    catch (e) {
        console.error(e)
        return res.status(500).json({ message: 'Erro ao carregar dados ambientais' });
    }


};
const getByDate = async (req, res, next) => {
    try {
        const startDate = moment(req.params.start_date).startOf('day').format("YYYY-MM-DD HH:mm:ss")
            || moment().startOf('day').format("YYYY-MM-DD HH:mm:ss");
        const endDate = moment(req.params.end_date).endOf('day').format("YYYY-MM-DD HH:mm:ss")
            || moment().endOf('day').format("YYYY-MM-DD HH:mm:ss");

        const environmentalData = await EnvironmentalLogs.findAll({
            where: {
                timestamp: {
                    [Op.between]: [startDate, endDate]
                }
            }
        });
        return res.status(200).json({ environmentalData });
    }
    catch (e) {
        console.error(e)
        return res.status(500).json({ message: 'Erro ao carregar dados ambientais' });
    }

};
const create = async (req, res, next) => {
    try {
        await EnvironmentalLogs.create(req.body);
        return res.status(201).json({ message: "Dados ambientais cadastrados com sucesso!" });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Erro ao cadastrar dados ambientais' });
    }
};

const destroy = async (req, res, next) => {
    try {
        const startDate = moment(req.params.start_date).startOf('day').format("YYYY-MM-DD HH:mm:ss")
            || moment().startOf('day').format("YYYY-MM-DD HH:mm:ss");
        const endDate = moment(req.params.end_date).endOf('day').format("YYYY-MM-DD HH:mm:ss")
            || moment().endOf('day').format("YYYY-MM-DD HH:mm:ss");

        const environmentalData = await EnvironmentalLogs.findAll({
            where: {
                timestamp: {
                    [Op.between]: [startDate, endDate]
                }
            }
        });
        environmentalData.destroy();
        return res.status(200).send(`Dados ambientais excluídos com sucesso!`);
    }
    catch (e) {
        console.error(e)
        return res.status(500).send('Erro ao excluir dados ambientais');
    }
};

module.exports = {
    create,
    destroy,
    get,
    getByDate
}