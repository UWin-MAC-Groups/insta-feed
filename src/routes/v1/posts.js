var express = require('express');
const { PostController, FileController } = require('../../controllers');
var postRouter = express.Router();

postRouter.get('/', PostController.viewFeed);
postRouter.post('/', PostController.post);
postRouter.get('/:id', PostController.viewPost);
postRouter.post('/:id/comments', PostController.comment);
postRouter.get('/:id/files', FileController.getFile);
postRouter.post('/:id/files', FileController.upload);
postRouter.put('/:id', PostController.like);
postRouter.delete('/:id', PostController.delete);

module.exports = postRouter;
