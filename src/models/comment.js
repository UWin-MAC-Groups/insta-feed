let mongoose = require("mongoose");
let Schema = mongoose.Schema;
const commentSchema = new mongoose.Schema(
  {
    postId: { type: Schema.Types.ObjectId, ref: "post", required: true },
    comment: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("comment", commentSchema);