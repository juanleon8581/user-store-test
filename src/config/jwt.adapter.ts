import jwt from "jsonwebtoken";

export class JwtAdapter {
  static async generateToken(
    payload: any,
    jwtSeed: string,
    duration: string = "2h"
  ) {
    return new Promise((resolve) => {
      jwt.sign(payload, jwtSeed, { expiresIn: duration }, (err, token) => {
        if (err) return resolve(null);

        resolve(token);
      });
    });
  }

  static validateToken<T>(token: string, jwtSeed: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, jwtSeed, (err, decoded) => {
        if (err) return resolve(null);

        resolve(decoded as T);
      });
    });
  }
}
