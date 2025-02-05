import {
  IUser,
  IUserCreateDto,
  IUserUpdateDto,
} from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
  public async getFilterList(
    filters: Record<string, string | number>,
  ): Promise<IUser[]> {
    const query: any = {};
    for (const key in filters) {
      const value = filters[key];
      if (!isNaN(Number(value))) {
        query[key] = Number(value);
      } else {
        query[key] = { $regex: `^${value}$`, $options: "i" };
      }
    }
    return await User.find(query);
  }
  public async getList(): Promise<IUser[]> {
    return await User.find();
  }

  public async create(dto: IUserCreateDto): Promise<IUser> {
    return await User.create(dto);
  }
  public async getById(userId: string): Promise<IUser> {
    return await User.findById(userId);
  }
  public async getByEmail(email: string): Promise<IUser> {
    return await User.findOne({ email });
  }
  public async updateById(dto: IUserUpdateDto, userId: string): Promise<any> {
    return await User.findByIdAndUpdate(userId, dto, { new: true });
  }
  public async deleteById(userId: string): Promise<void> {
    return await User.findByIdAndDelete(userId);
  }
}
export const userRepository = new UserRepository();
