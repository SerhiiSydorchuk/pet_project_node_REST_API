import mongoose from "mongoose";

import { IPost, IPostDto } from "../interfaces/posts.interface";
import { Post } from "../models/posts.model";

class PostRepository {
  public async create(
    postData: { _userId: mongoose.Types.ObjectId } & IPostDto,
  ): Promise<IPost> {
    return await Post.create(postData);
  }

  public async getByUser(userId: mongoose.Types.ObjectId): Promise<IPost[]> {
    return await Post.find({ _userId: userId });
  }

  public async getById(postId: mongoose.Types.ObjectId): Promise<IPost> {
    return await Post.findById(postId);
  }

  public async update(
    postId: mongoose.Types.ObjectId,
    updateData: Partial<IPost>,
  ): Promise<IPost> {
    return await Post.findByIdAndUpdate(postId, updateData, { new: true });
  }

  public async delete(postId: mongoose.Types.ObjectId): Promise<void> {
    await Post.findByIdAndDelete(postId);
  }
}

export const postRepository = new PostRepository();
