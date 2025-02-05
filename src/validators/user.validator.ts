import joi from "joi";

import { regexConstant } from "../constans/regex.constant";

export class UserValidator {
  private static name = joi.string().min(3).max(50).trim();
  private static age = joi.number().min(18).max(200);
  private static email = joi.string().regex(regexConstant.EMAIL).trim();
  private static password = joi.string().regex(regexConstant.PASSWORD).trim();
  private static phone = joi.string().regex(regexConstant.PHONE).trim();
  private static city = joi.string().min(1).max(50).trim();
  private static gender = joi.string().min(1).max(50).trim();

  public static create = joi.object({
    name: this.name.required(),
    age: this.age.required(),
    email: this.email.required(),
    password: this.password.required(),
    phone: this.phone.optional(),
    city: this.city,
    gender: this.gender,
  });

  public static update = joi.object({
    name: this.name,
    age: this.age,
    phone: this.phone,
    city: this.city,
    gender: this.gender,
  });
  public static login = joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });
}
