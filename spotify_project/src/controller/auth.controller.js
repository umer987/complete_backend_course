const usermodel = require('../db/models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


async function register_user(req, res) {
