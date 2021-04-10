const { getAllPosts, createOnePost, updateOnePost, deleteOnePost } = require('../controllers/postController');
const { verifyToken } = require('../middlewares/verifyToken');
const Router = require('express').Router();

Router.route('/').get(getAllPosts).post(verifyToken, createOnePost);
Router.route('/:postId').put(verifyToken, updateOnePost).delete(verifyToken, deleteOnePost);

module.exports = Router;