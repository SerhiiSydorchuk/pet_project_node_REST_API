import { NextFunction, Request, Response } from "express";

import { TokenEnum } from "../enums/tokenEnum";
import { ApiError } from "../errors/api.errror";
import { tokenRepository } from "../repositories/token.repository";
import { tokenService } from "../services/token.service";

class AuthMiddleware {
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const header = req.headers.authorization;
      if (!header) {
        throw new ApiError("No token provided", 401);
      }
      const accessToken = header.split("Bearer ")[1];
      if (!accessToken) {
        throw new ApiError("No token provided", 401);
      }
      const tokenPayload = tokenService.verifyToken(
        accessToken,
        TokenEnum.ACCESS,
      );

      const pair = await tokenRepository.findByParams({ accessToken });
      if (!pair) {
        throw new ApiError("Invalid token", 401);
      }
      req.res.locals.tokenId = pair._id;
      req.res.locals.tokenPayload = tokenPayload;
      next();
    } catch (e) {
      next(e);
    }
  }
  public async checkRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const header = req.headers.authorization;
      if (!header) {
        throw new ApiError("No token provided", 401);
      }
      const refreshToken = header.split("Bearer ")[1];
      if (!refreshToken) {
        throw new ApiError("No token provided", 401);
      }
      const tokenPayload = tokenService.verifyToken(
        refreshToken,
        TokenEnum.REFRESH,
      );

      const pair = await tokenRepository.findByParams({ refreshToken });
      if (!pair) {
        throw new ApiError("Invalid token", 401);
      }
      req.res.locals.tokenPayload = tokenPayload;
      req.res.locals.refreshToken = refreshToken;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
