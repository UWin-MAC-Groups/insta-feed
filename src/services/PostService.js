const PostRepo = require('../repositories/PostRepo');
const { isNullOrUndefined } = require('util');

class PostService {
    /**
     * Submit a post
     * @param {Object} postData Object containing the details of the post
     */
    static async submitPost(postData) {
        try {
            const repoRes = await PostRepo.createPost(postData);
            if(repoRes.success) return { success: true, data: { post: repoRes.data[0] }, message: repoRes.message };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * View a posts data
     * @param {string} id The post id
     */
    static async viewPost(id) {
        try {
            const repoRes = await PostRepo.getPost(id);
            if(!repoRes.success) return { success: false, data: {}, message: repoRes.message };

            return { success: true, data: { post: repoRes.data[0] }, message: repoRes.message };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Like a post
     * @param {number} id Id of the post
     */
    static async likePost(id) {
        try {
            const repoRes = await PostRepo.addLikeToPost(id);
            if(repoRes.success) return { success: true, data: { post: repoRes.data[0] }, message: repoRes.message };
            else return { success: false, data: { post: null }, message: repoRes.message };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Comment on a post
     * @param {Object} commentData An object containing comment data
     */
    static async commentOnPost(commentData) {
        try {
            const repoRes = await PostRepo.addCommentToPost(commentData);
            if(repoRes.success) return { success: true, data: { post: repoRes.data[0] }, message: repoRes.message };
            else return { success: false, data: { post: null }, message: repoRes.message };
        } catch (error) {
            throw new Error(error.message)
        }
    }

    /**
     * Delete a post
     * @param {number} id The id of the pos
     */
    static async removePost(id) {
        try {
            const repoRes = await PostRepo.deletePost(id);
            if(repoRes.success) return { success: true, data: {}, message: repoRes.message };
            else return { success: false, data: {} , message: repoRes.message };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Get the posts for the feed.
     * @param {Object} feedSettings Object containing string settings such as tag and type
     * @param {*} paginationSettings Object containing settings for pagination such as limit, skip and sort.
     */
    static async getPostsFeed(feedSettings, paginationSettings) {
        const type = feedSettings.type;
        const tag = feedSettings.tag;
        const sortBy = feedSettings.sortBy;

        try {
            let repoRes;
            if(
                (type != null || typeof type !== 'undefined') &&
                (tag === null || typeof tag === 'undefined')
            ) {
                repoRes = await PostRepo.getPostsByType(type, sortBy, paginationSettings);
            }
            else if(
                (type === null || typeof type === 'undefined') &&
                (tag != null || typeof tag !== 'undefined')
            ) {
                repoRes = await PostRepo.getPostsByTag(tag, sortBy, paginationSettings);
            }
            else if(
                (type != null || typeof type !== 'undefined') &&
                (tag != null || typeof tag !== 'undefined')
            ) {
                repoRes = await PostRepo.getPostsByTagAndType(feedSettings, paginationSettings);
            }
            else {
                repoRes = await PostRepo.getPosts(paginationSettings.limit, paginationSettings.skip, sortBy); 
            }

            if(repoRes.success) return { success: true, data: { posts: repoRes.data }, message: repoRes.message };
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = PostService;
