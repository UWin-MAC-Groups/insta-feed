var express = require('express');
const { PostController } = require('../../controllers');
var postRouter = express.Router();

postRouter.get('/', PostController.viewFeed);
postRouter.post('/', PostController.post);
postRouter.get('/:id', PostController.viewPost);
postRouter.post('/:id/comments', PostController.comment);
postRouter.put('/:id', PostController.like);
postRouter.delete('/:id', PostController.delete);

module.exports = postRouter;
