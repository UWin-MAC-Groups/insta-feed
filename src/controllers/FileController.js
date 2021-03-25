const FileService = require('../services/FileService');

class FileController {
    static async upload(req, res) {
        try {
            const serviceRes = await FileService.uploadFile(req, res);
            if(!serviceRes.success) 
            return res.status(422).json({ status: 'error', message: serviceRes.message, data: null });

            return res.status(201).json({ status: 'success', message: "File successfully uploaded", data: serviceRes.data.fileDetails });

        } catch (error) {
            return res.status(500).json({ status: 'error', message: "Internal server error", data: error.message })
        }
    }

    static async getFile(req, res) {
        try {
            const serviceRes = await FileService.getChunkByPostId(req.params.id);
            if(!serviceRes.success) 
            return res.status(401).json({ status: 'error', message: serviceRes.message, data: null });

            return res.status(200).json({ status: 'success', message: "File successfully retrieved", data: serviceRes.data.chunk });

        } catch (error) {
            return res.status(500).json({ status: 'error', message: "Internal server error", data: error.message })
        }
    }
}

module.exports = FileController;
