import { RequestHandler, Request, Response, NextFunction } from "express";
import Joi from "joi";

export const joiDeleteUser: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {

    if (req.body) {
      const schema = Joi.object({
        email: Joi.string().email().lowercase().required().messages({
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

      await schema.validateAsync(req.body);

      return next();
    } else {
      return res.status(400).json({
        msg: "Bad request.",
      });
    }
  } catch (e: any) {
    if (e.name === "ValidationError" || e.details) {
      return res.status(400).json({ msg: e.details[0].message });
    }
  }
};
