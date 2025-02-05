import { RoleEnum } from "../enums/role.enum";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  age: number;
  password: string;
  role: RoleEnum;
  phone?: string;
  city?: string;
  gender?: string;
  isDeleted: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type IUserCreateDto = Pick<
  IUser,
  "name" | "email" | "password" | "age" | "phone" | "city" | "gender"
>;

export type IUserUpdateDto = Pick<
  IUser,
  "name" | "age" | "phone" | "city" | "gender" | "email"
>;
export type ILogin = Pick<IUser, "email" | "password">;
