import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Ensure the request data has the expected structure
      const requestData = {
        body: req.body || {},
        query: req.query || {},
        params: req.params || {},
      };

      await schema.parseAsync(requestData);

      return next();
    } catch (err: any) {
      const errorMessage = JSON.parse(err.message);
      return res.status(400).json({
        status: "Bad Request!",
        message: errorMessage,
      });
    }
  };

export default validate;
