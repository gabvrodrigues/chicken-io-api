const { Users } = require('./../models');
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

const get = async (req, res, next) => {
    const user = await Users.findAll();
    return res.status(201).json(user);
};

const login = async (req, res, next) => {
    const body = req.body;
    let user = await Users.findOne({ where: { email: body.email } });
    if (user) {
        const validPassword = await bcrypt.compare(body.password, user.map(el => el.password));
        if (validPassword) {
            return res.status(200).json({ message: "Login efetuado com sucesso", user });
        }
        return res.status(400).json({ error: "E-mail e/ou senha inválidos" });
    }
    return res.status(401).json({ error: "E-mail e/ou senha inválidos" });
};
const create = async (req, res, next) => {
    try {
        let user = req.body;
        if (!(user.email && user.password)) {
            return res.status(400).json({ error: "Dados Inválidos" });
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await Users.create(user);
        return res.status(201).json({ message: 'Usuário criado com sucesso!' });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Erro ao cadastrar usuário' });
    }
};
const update = async (req, res, next) => {
    let id = req.params.id;
    const newUser = req.body;
    const user = await user.findByPk(id);
    if (user) {
        await user.update(newUser);
        return res.status(201).json({ message: `Usuário atualizado com sucesso!` });
    }
    return res.status(500).json({ message: 'Erro ao editar usuário' });
};

const destroy = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await Users.findByPk(id);
        user.destroy();
        return res.status(200).json({ message: `Usuário excluído com sucesso!` });
    }
    catch (e) {
        return res.status(500).json({ message: 'Erro ao excluir usuário' });
    }
};

module.exports = {
    create,
    update,
    destroy,
    get,
    login
}