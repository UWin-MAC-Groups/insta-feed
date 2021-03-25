let mongoose = require("mongoose");
let Schema = mongoose.Schema;
const postSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    media: { type: Schema.Types.ObjectId, ref: "media.file" },
    type: { type: String, required: true, index: true },
    tags: { type: Array, index: true },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    isCommentEnabled: { type: Boolean, default: true },
    comments: [{ type: Schema.Types.ObjectId, ref: "comment" }],
    commentsCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

postSchema.index({ createdAt: -1 });

module.exports = mongoose.model("post", postSchema);