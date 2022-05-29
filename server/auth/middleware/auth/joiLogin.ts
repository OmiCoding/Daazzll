import { RequestHandler, Request, Response, NextFunction } from "express";
import Joi from "joi";

export const joiLogin: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {

    let schema: Joi.ObjectSchema<any>;


    if(/[@\.]/.test(req.body.email_user)) {
      schema = Joi.object({
        email_user: Joi.string().email().lowercase().required().messages({
          "string.base": "Please enter a valid username.",
          "string.email:": "Please enter a valid username",
          "any.required": "An email is required.",
        }),
        password: Joi.string().min(8).max(255).required().messages({
          "string.base": "Please enter a password.",
          "string.min": "The password must have at least 8 characters.",
          "string.max": "You passed the limit for the password size.",
          "any.required": "A password is required.",
        }),
      });
    } else {
      schema = Joi.object({
        email_user: Joi.string().lowercase().required().messages({
          "string.base": "Please enter a valid username.",
          "string.min": "The username you have entered is too short",
          "string.max": "The username you have entered is too long.",
          "any.required": "A username is required.",
        }),
        password: Joi.string().min(8).max(255).required().messages({
          "string.base": "Please enter a password.",
          "string.min": "The password must have at least 8 characters.",
          "string.max": "You passed the limit for the password size.",
          "any.required": "A password is required.",
        }),
      });
    }

    await schema.validateAsync(req.body);

    return next();
  } catch (e: any) {
    if (e.name === "ValidationError" || e.details) {
      return res.status(400).json({ msg: e.details[0].message });
    }
    return next(e);
  }
};
