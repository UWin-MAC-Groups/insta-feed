const dotenv = require('dotenv');
const mongoose = require("mongoose");

dotenv.config();
const uri = process.env.ATLAS_DB_URI;

const startMongoServer = async () => {
  try {
    await mongoose.connect(uri, { 
        useNewUrlParser: true, 
        useCreateIndex: true, 
        useUnifiedTopology: true 
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = startMongoServer;
