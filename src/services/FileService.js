const dotenv = require('dotenv');
const path = require("path");
const multer = require("multer");
const crypto = require("crypto");
const gridFsStorage = require("multer-gridfs-storage");

const FileRepo = require('../repositories/FileRepo');
const PostRepo = require('../repositories/PostRepo');

class FileService {
    static async getChunkByPostId(id) {
        try {
            const repoRes = await FileRepo.getFileChunkByPostId(id);
            if(!repoRes.success)
            return { success: false, data: {}, message: repoRes.message };

            else return { success: true, data: { chunk: repoRes.data[0] }, message: repoRes.message };
        } catch (error) {
            throw new Error(error.message);
        }
    }
    static async getFilesForPost(posts) {
        try {
            let files = [];

            for await (post of posts) {
                const repoRes = await FileRepo.getFileChunkByPostId(post._id);

                if(!repoRes.success)
                return { success: false, data: {}, message: repoRes.message };

                const file = repoRes.data[0];
                files.push(file);
            }

            return { success: true, data: { files: files }, message: repoRes.message };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * 
     * @param {Request Object} request 
     */
    static async uploadFile(req, res) {
        try {
          const storage = new gridFsStorage({
            url: process.env.ATLAS_DB_URI,
            file: (req, file) => {
              return new Promise((resolve, reject) => {
                crypto.randomBytes(16, (err, buf) => {
                  if (err) {
                    return reject(err);
                  }
                  const filename = req.params.id + path.extname(file.originalname);
                  const fileInfo = {
                    metadata: {
                      postId: req.params.id,
                    },
                    filename: filename,
                    bucketName: "media",
                  };
                  resolve(fileInfo);
                });
              });
            },
          });
            
          const upload = multer({ storage }).any();

          const getServiceRes = () => {
            return new Promise((resolve, reject) => {
              upload(req, res, function (err) {
                if (err) {
                  console.log(err);
                  PostRepo.deletePost(req.params.id)
                  .then((res) => {
                    if(res.success) {
                      const response = { success: false, data: {}, message: "Error while uploading a file. Post deleted successfully." };
                      resolve(response);
                    }
                    else {
                      const response = { success: false, data: {}, message: "Error while deleting post." };
                      resolve(response);
                    }
                  })
                  .catch((err) => reject(err));
                } 
                else {
                  let response = {success: false, data: {}, message: ""};
                  req.files.forEach(function (fileDetails) {
                    PostRepo.linkFileToPost(fileDetails)
                    .then((res) => {
                      if(res.success) {
                        response = { success: true, data: {fileDetails: fileDetails}, message: "File successfully uploaded." };                        
                        resolve(response);
                      }
                      else {
                        response = { success: false, data: {fileDetails: fileDetails}, message: "File not successfully uploaded." };
                        resolve(response);
                      }
                    })
                    .catch((err) => {
                      reject(err);
                    });
                  });
                      
                }
              });
            });
          }

          const serviceRes = await getServiceRes();
          return serviceRes;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = FileService;
