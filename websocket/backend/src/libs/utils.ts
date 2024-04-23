import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { Response } from "express";

export const createJwtToken = (_id: ObjectId) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, { expiresIn: "3d" });
};

export const end = (
  response: Response,
  statusCode: number,
  message: string | { [key: string]: string }
) => {
  return response.status(statusCode).end(message);
};