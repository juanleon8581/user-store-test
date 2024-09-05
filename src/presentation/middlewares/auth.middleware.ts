import { NextFunction, Request, Response } from "express";
import { JwtAdapter, envs } from "../../config";
import { UserModel } from "../../data";
import { UserEntity } from "../../domain";

const jwtSeed = envs.JWT_SEED;

export class AuthMiddleware {
  static async validateJWT(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header("Authorization");
    if (!authorization)
      return res.status(401).json({ error: "Token not provided" });
    if (!authorization.startsWith("Bearer "))
      return res.status(401).json({ error: "Invalid Bearer token format" });

    const token = authorization.split(" ").at(1) || "";

    try {
      const payload = await JwtAdapter.validateToken<{ userId: string }>(
        token,
        jwtSeed
      );
      if (!payload) return res.status(401).json({ error: "Invalid token" });

      const user = await UserModel.findById(payload.userId);
      if (!user)
        return res
          .status(500)
          .json({ error: "Internal Server Error with user" });

      //TODO: Validar usuario activo

      req.body.user = UserEntity.fromObject(user);

      next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
