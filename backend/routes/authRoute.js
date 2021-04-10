const { register, login, getCurrentUser } = require('../controllers/authController');
const { checkCurrentUser } = require('../middlewares/checkCurrentUser');

const Router = require('express').Router();

Router.route('/register').post(register);
Router.route('/login').post(login);
Router.route('/').get(checkCurrentUser, getCurrentUser);

module.exports = Router;