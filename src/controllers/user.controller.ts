import { NextFunction, Request, Response } from "express";

import { ITokenPayload } from "../interfaces/token.interface";
import { IUserUpdateDto } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

class UserController {
  public async getFilterList(req: Request, res: Response, next: NextFunction) {
    try {
      const filters = req.query as Record<string, string | number>;
      const result = await userService.getFilterList(filters);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.getList();
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenPayLoad = req.res.locals.tokenPayload as ITokenPayload;
      const result = await userService.getMe(tokenPayLoad);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async updateMe(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenPayLoad = req.res.locals.tokenPayload as ITokenPayload;
      const dto = req.body as IUserUpdateDto;
      const result = await userService.updateMe(dto, tokenPayLoad);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async deleteMe(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenPayLoad = req.res.locals.tokenPayload as ITokenPayload;
      await userService.deleteMe(tokenPayLoad);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const result = await userService.getUserById(userId);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async getUserByEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.params;
      const result = await userService.getUserByEmail(email);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
