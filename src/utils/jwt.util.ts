import jwt from "jsonwebtoken";
import config from "../config/config";


export function createTokens(data: any) {
    const accessToken = jwt.sign({ data }, config.jwtAccessKey, { expiresIn: config.accessTokenExpiry })
    const refreshToken = jwt.sign({ data }, config.jwtRefershKey, { expiresIn: config.refreshTokenExpiry })

    return {
        accessToken,
        refreshToken,
    }
}