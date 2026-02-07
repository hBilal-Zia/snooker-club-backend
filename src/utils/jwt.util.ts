import jwt from "jsonwebtoken";
import config from "../config/config";
import HttpError from "./error.util";


export function createTokens(data: any) {
    const accessToken = jwt.sign({ id: data.id }, config.jwtAccessKey, { expiresIn: config.accessTokenExpiry })
    const refreshToken = jwt.sign({ id: data.id }, config.jwtRefershKey, { expiresIn: config.refreshTokenExpiry })

    return {
        accessToken,
        refreshToken,
    }
}

export async function verifyJwt<T>(
  token: string,
  key: string
): Promise<T> {
  try {
    return jwt.verify(token, key) as T;
  } catch (error) {
    throw new HttpError("Invalid or expired token", 401);
  }
}
