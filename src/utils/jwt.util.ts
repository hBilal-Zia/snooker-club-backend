import jwt, { SignOptions } from "jsonwebtoken";
import config from "../config/config";
import HttpError from "./error.util";

const accessTokenOptions: SignOptions = {
    expiresIn: config.accessTokenExpiry as SignOptions["expiresIn"],
};
const refreshTokenOptions: SignOptions = {
    expiresIn: config.refreshTokenExpiry as SignOptions["expiresIn"],
};

export function createTokens(data: any) {
    const accessToken = jwt.sign({ id: data.id }, config.jwtAccessKey, accessTokenOptions);
    const refreshToken = jwt.sign({ id: data.id }, config.jwtRefershKey, refreshTokenOptions);

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
