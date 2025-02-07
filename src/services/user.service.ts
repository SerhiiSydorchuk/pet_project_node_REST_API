import { ApiError } from "../errors/api.errror";
import { ITokenPayload } from "../interfaces/token.interface";
import { IUser, IUserUpdateDto } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getFilterList(
    filters: Record<string, string | number>,
  ): Promise<IUser[]> {
    return await userRepository.getFilterList(filters);
  }
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }
  public async getMe(tokenPayLoad: ITokenPayload): Promise<IUser> {
    const user = await userRepository.getById(tokenPayLoad.userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }
  public async updateMe(
    dto: IUserUpdateDto,
    tokenPayLoad: ITokenPayload,
  ): Promise<IUser> {
    const user = await userRepository.getById(tokenPayLoad.userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return await userRepository.updateById(dto, tokenPayLoad.userId);
  }

  public async deleteMe(tokenPayLoad: ITokenPayload): Promise<void> {
    const user = await userRepository.getById(tokenPayLoad.userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    await userRepository.deleteById(tokenPayLoad.userId);
  }
  public async isEmailExist(email: string): Promise<void> {
    const user = await userRepository.getByEmail(email);
    if (user) {
      throw new ApiError("Email already exist", 400);
    }
  }
  public async getUserById(userId: string): Promise<IUser> {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }
  public async getUserByEmail(email: string): Promise<IUser> {
    const user = await userRepository.getByEmail(email);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }
}

export const userService = new UserService();
