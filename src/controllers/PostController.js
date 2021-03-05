const PostService = require('../services/PostService');

class PostController {
    static async post(req, res) {
        try {
            if(req.body.content === null || req.body.content === undefined) 
                return res.status(400).json({ status: 'error', message: "Post 'content' is missing", data: null });
            else if(req.body.type === null || req.body.type === undefined)
            return res.status(400).json({ status: 'error', message: "Post 'type' is missing", data: null });

            const serviceRes = await PostService.submitPost(req.body);
            return res.status(201).json({ status: 'success', message: "Content successfully posted", data: serviceRes.data.post });
        } catch (error) {
            return res.status(500).json({ status: 'error', message: "Internal server error", data: error.message })
        }
    }

    static async viewPost(req, res) {
        try {
            const serviceRes = await PostService.viewPost(req.params.id);

            if(!serviceRes.success) return res.status(404).json({ status: 'error', message: "Post not found", data: serviceRes.message });

            return res.status(200).json({ status: 'success', message: "Post found", data: serviceRes.data.post });
        } catch (error) {
            return res.status(500).json({ status: 'error', message: "Internal server error", data: error.message });
        }
    }

    static async like(req, res) {
        try {
            const serviceRes = await PostService.likePost(req.params.id);
            if(!serviceRes.success) return res.status(404).json({ status: 'error', message: "Post not found", data: serviceRes.message });

            return res.status(201).json({ status: 'success', message: "Post liked", data: serviceRes.data.post });
        } catch (error) {
            return res.status(500).json({ status: 'error', message: "Internal server error", data: error.message });
        }
    }

    static async comment(req, res) {
        try {
            const serviceRes = await PostService.commentOnPost(req.body);
            if(!serviceRes.success) return res.status(404).json({ status: 'error', message: "Post not found", data: serviceRes.message });

            return res.status(201).json({ status: 'success', message: "Comment added", data: serviceRes.data.post });
        } catch (error) {
            return res.status(500).json({ status: 'error', message: "Internal server error", data: error.message });
        }
    }

    static async viewFeed(req, res) {
        try {
            const serviceRes = await PostService.getPostsFeed(req.body.feedSettings, req.body.paginationSettings);

            if(!serviceRes.success) return res.status(400).json({ status: 'error', message: "Unable to get feed", data: error.message });

            return res.status(200).json({ status: 'success', message: `${serviceRes.data.posts.length} Posts returned`, data: serviceRes.data.posts });
        } catch (error) {
            return res.status(500).json({ status: 'error', message: "Internal server error", data: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const serviceRes = await PostService.removePost(req.params.id);
            if(!serviceRes.success) return res.status(404).json({ status: 'error', message: "Post not found", data: serviceRes.message });

            return res.status(200).json({ status: 'success', message: "Post deleted", data: serviceRes.data });
        } catch (error) {
            return res.status(500).json({ status: 'error', message: "Internal server error", data: error.message });
        }
    }
}

module.exports = PostController;
