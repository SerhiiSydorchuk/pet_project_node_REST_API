import * as jwt from "jsonwebtoken";

import { config } from "../configs/config";
import { TokenEnum } from "../enums/tokenEnum";
import { ApiError } from "../errors/api.errror";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";

class TokenService {
  public generateToken(payload: ITokenPayload): ITokenPair {
    const accessToken = jwt.sign(payload, config.jwtAccessSecret, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, config.jwtRefreshSecret, {
      expiresIn: "30d",
    });

    return { accessToken, refreshToken };
  }
  public verifyToken(token: string, type: TokenEnum): ITokenPayload {
    try {
      let secret: string;

      switch (type) {
        case "access":
          secret = config.jwtAccessSecret;
          break;
        case "refresh":
          secret = config.jwtRefreshSecret;
          break;
        default:
          throw new ApiError("Invalid token type", 401);
      }

      return jwt.verify(token, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Invalid token", 401);
    }
  }
}

export const tokenService = new TokenService();
