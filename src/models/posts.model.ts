import mongoose, { model, Schema } from "mongoose";

import { IPost } from "../interfaces/posts.interface";
import { User } from "./user.model";

const PostSchema = new Schema(
  {
    postId: {
      type: String,
      unique: true,
      default: () => new mongoose.Types.ObjectId().toString(),
    },
    _userId: { type: Schema.Types.ObjectId, ref: User, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true, versionKey: false },
);

export const Post = model<IPost>("Post", PostSchema);
