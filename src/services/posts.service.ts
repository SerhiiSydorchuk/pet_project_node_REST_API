import mongoose from "mongoose";

import { ApiError } from "../errors/api.errror";
import { IPost } from "../interfaces/posts.interface";
import { postRepository } from "../repositories/posts.repository";

class PostService {
  public async createPost(
    userId: mongoose.Types.ObjectId,
    title: string,
    body: string,
  ): Promise<IPost> {
    return await postRepository.create({
      _userId: userId, // userId передається в пост
      title,
      body,
    });
  }

  public async getUserPosts(userId: mongoose.Types.ObjectId): Promise<IPost[]> {
    return await postRepository.getByUser(userId);
  }

  public async updatePost(
    userId: mongoose.Types.ObjectId,
    postId: mongoose.Types.ObjectId,
    title: string,
    body: string,
  ): Promise<IPost> {
    const post = await postRepository.getById(postId);
    if (!post) throw new ApiError("Post not found", 404);
    if (post._userId.toString() !== userId.toString())
      throw new ApiError("Unauthorized", 403);

    return await postRepository.update(postId, {
      title,
      body,
      updatedAt: new Date(),
    });
  }

  public async deletePost(
    userId: mongoose.Types.ObjectId,
    postId: mongoose.Types.ObjectId,
  ): Promise<void> {
    const post = await postRepository.getById(postId);
    if (!post) throw new ApiError("Post not found", 404);
    if (post._userId.toString() !== userId.toString())
      throw new ApiError("Unauthorized", 403);

    await postRepository.delete(postId);
  }
}

export const postService = new PostService();
