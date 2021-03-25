const File = require('../models/file');
const Chunk = require('../models/chunk');

class FileRepo {
    static async getFileChunkByPostId(postId) {
        try {
            var file = await File.findOne({
                metadata: { postId: postId },
            });
            if (file != null) {
                var chunk = await Chunk.findOne({ files_id: file._id }).populate("file_id");
                return { success: true, data: [chunk], message: "Chunk received" };
            } 
            else  
            return { success: false, data: [], message: "File not found" };
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = FileRepo;