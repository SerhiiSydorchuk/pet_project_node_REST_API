import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { IPostDto } from "../interfaces/posts.interface";
import { ITokenPayload } from "../interfaces/token.interface";
import { postService } from "../services/posts.service";

class PostController {
  // Створення поста (користувач може створювати лише свої пости)
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, body } = req.body as IPostDto;
      const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;

      const post = await postService.createPost(
        new mongoose.Types.ObjectId(tokenPayload.userId), // userId з токена
        title,
        body,
      );

      res.status(201).json(post);
    } catch (e) {
      next(e);
    }
  }

  // Отримання постів користувача (можна неавторизованим)
  public async getUserPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const posts = await postService.getUserPosts(
        new mongoose.Types.ObjectId(userId),
      );
      res.status(200).json(posts);
    } catch (e) {
      next(e);
    }
  }

  // Оновлення поста (лише свої пости)
  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { postId } = req.params;
      const { title, body } = req.body;
      const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;

      const updatedPost = await postService.updatePost(
        new mongoose.Types.ObjectId(tokenPayload.userId),
        new mongoose.Types.ObjectId(postId),
        title,
        body,
      );

      res.status(200).json(updatedPost);
    } catch (e) {
      next(e);
    }
  }

  // Видалення поста (лише свої пости)
  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { postId } = req.params;
      const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;

      await postService.deletePost(
        new mongoose.Types.ObjectId(tokenPayload.userId),
        new mongoose.Types.ObjectId(postId),
      );

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const postController = new PostController();
