const mongoose = require("mongoose");

const Post = require('../models/post');
const Comment = require('../models/comment');

class PostRepo {
    /**
     * Creates a new post in the db in the posts collection
     * @param {Object} postData The data to be sumited to the db
     */
    static async createPost(postData) {
        try {
            const newPost = await Post.create(postData);
            return { success: true, data: [newPost], message: "Post saved" };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Get a post by its id
     * @param {String} id The post id
     */
    static async getPost(id) {
        try {
            const post = await Post.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true, useFindAndModify: false })
            .populate("comments");
            
            if(post.length == 0) return { success: false, data: [], message: "Post not found" };
            return { success: true, data: [post], message: "Post found" };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Get all posts in the collection with no query parameters
     */
    static async getPosts() {
        try {
            const posts = Post.find({});
            return { success: true, data: posts, message: "Posts retrieved" };
        } catch (error) {
            throw new Error(error.message)
        }
    }

    /**
     * Get all posts based on the number to retrieve and skip by and sort parameter
     * @param {number} limit The number of documents to retrieve
     * @param {number} skip The number of documents to skip
     * @param {Object} sortBy Object with the sort query
     */
    static async getPosts(limit, skip, sortBy) {
        
        try {
            const posts = await Post.aggregate([
                { $sort: sortBy },
                { $limit: limit + skip },
                { $skip: skip }
            ]);

            return { success: true, data: posts, message: "Posts retrieved" };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Get all posts with a particular tag
     * @param {string} tag Tag to query by
     * @param {Object} paginationSettings Object containing limit (no of documents to get), skip (no of documents to skip) and sort (sort query)
     */
    static async getPostsByTag(tag, sortBy, paginationSettings) {
        const { limit, skip } = paginationSettings;
        const tagRegexPattern = new RegExp(`${tag}`, "i");
        try {
            var posts = await Post.aggregate([
                { $match: { tags: { $in: [tagRegexPattern] } } },
                { $sort: sortBy },
                { $limit: limit + skip },
                { $skip: skip },
            ]);
            return { success: true, data: posts, message: `Posts tagged #${tag} retrieved` };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Get all posts of a particular type: text, photo, video, audio
     * @param {string} type Type of post
     * @param {Object} paginationSettings Object containing limit (no of documents to get), skip (no of documents to skip) and sort (sort query)
     */
    static async getPostsByType(type, sortBy, paginationSettings) {
        const { limit, skip } = paginationSettings;
        try {
            var posts = await Post.aggregate([
                { $match: { type: type } },
                { $sort: sortBy },
                { $limit: limit + skip },
                { $skip: skip },
            ]);
            return { success: true, data: posts, message: `Posts of type: ${type} retrieved` };
        } catch (error) {
            throw new Error(error.message);
        }
    }

     /**
      * 
      * @param {Object} feedSettings Object containing 'type' of post, 'tag' of post and sortBy Object: { "fieldName": 1/-1}
      * @param {Object} paginationSettings Object containing limit (no of documents to get), skip (no of documents to skip)
      */
    static async getPostsByTagAndType(feedSettings, paginationSettings) {
        const { type, tag, sortBy } = feedSettings;
        const { limit, skip } = paginationSettings;
        const tagRegexPattern = new RegExp(`${tag}`, "i");
        try {
            var posts = await Post.aggregate([
                { $match: { tags: { $in: [tagRegexPattern] } } },
                { $match: { type: type } },
                { $sort: sortBy },
                { $limit: limit + skip },
                { $skip: skip },
            ]);
            return { success: true, data: posts, message: `Posts of type: ${type} tagged #${tag} retrieved` };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Add a comment to a post
     * @param {Object} commentData Object with comment details
     */
    static async addCommentToPost(commentData) {
        try {
            let post = await Post.findById(commentData.postId);
            //console.log(commentData.postId)
            if(post) {
                if(!post.isCommentEnabled) return { success: false, data: [post], message: "Comment not enabled." };
                var comment = await Comment.create(commentData);
                post = await Post.findByIdAndUpdate(commentData.postId, { $push: { comments: comment._id }, $inc: { commentsCount: 1 } }, { new: true, useFindAndModify: false })
                        .populate("comments");
                return { success: true, data: [post], message: "Comment added." };
            }
            else {
                return { success: false, data: [], message: "Post not found" };
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Add a like to a post
     * @param {string} id Id of the post
     */
    static async addLikeToPost(id) {
        try {
            let post = await Post.findById(id);
            if(post) {
                post = await Post.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true, useFindAndModify: false }).populate("comments");
                return { success: true, data: [post], message: "Like added." };
            }
            else {
                return { success: false, data: [], message: "Post not found" };
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Delete a post
     * @param {string} id Id of the post
     */
    static async deletePost(id) {
        try {
            let post = await Post.findById(id);
            if(post) {
                await Post.findByIdAndDelete(id, { useFindAndModify: false });
                return { success: true, data: [], message: "Post deleted" };
            }
            else {
                return { success: false, data: [], message: "Post not found" };
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    /**
     * Function to link an uploaded file to a post.
     * @param {Object} fileDetails An object containing the file information such as name, id, metadata etc.
     * @returns Promise containing success object.
     */
    static async linkFileToPost(fileDetails) {
        try {
            const updatedPost = await Post.findByIdAndUpdate(fileDetails.metadata.postId, { $set: { media: fileDetails.id } }, { new: true, useFindAndModify: false });
            if(updatedPost === null) return { success: false, data: [], message: "Post not found" };
            return { success: true, data: [updatedPost], message: "File linked with post" };
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = PostRepo;
