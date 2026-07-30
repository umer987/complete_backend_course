const usermodel = require('../db/models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


async function register_user(req, res) {
    const { username, email, password, role = "user" } = req.body
    const hash = await bcrypt.hash(password,10)
    const isuserexist = await usermodel.findOne({
        $or: [
            { username },
            { email }
