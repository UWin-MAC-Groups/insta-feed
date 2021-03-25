const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const GridfsSchema = new mongoose.Schema(
  {
    files_id: { type: Schema.Types.ObjectId, ref: "media.file" },
    n: { type: Number },
    data: { type: Buffer },
  },
  { strict: false }
);

module.exports = mongoose.model("media.chunk", GridfsSchema);