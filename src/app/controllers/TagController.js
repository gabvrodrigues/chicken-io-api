const { Tags } = require('../models');
const { Op } = require("sequelize");

const get = async (req, res, next) => {
    const tag = await Tags.findAll();
    return res.status(201).json({ tag });
};

const create = async (req, res, next) => {
    try {
        await Tags.create(req.body);
        return res.status(201).json({ message: 'Tag criada com sucesso!' });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Erro ao criar tag!' });
    }
};
const update = async (req, res, next) => {
    let id = req.params.id;
    const newTag = req.body;
    const tag = await Tags.findByPk(id);
    if (tag) {
        await tag.update(newTag);
        return res.status(201).json({ message: 'Tag atualizada com sucesso!' });
    }
    return res.status(500).json({ message: 'Tag atualizada com sucesso!' })
};

const destroy = async (req, res, next) => {
    try {
        const id = req.params.id;
        const tag = await Tags.findByPk(id);
        tag.destroy();
        return res.status(200).json({ message: `Tag excluída com sucesso!` });
    }
    catch (e) {
        return res.status(500).json({ message: 'Erro ao excluir tag' });
    }
};

module.exports = {
    create,
    update,
    destroy,
    get,
}