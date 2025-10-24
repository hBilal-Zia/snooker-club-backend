import jwt from "jsonwebtoken";
import config from "../config/config";


export function createTokens(data: any) {
    const accessToken = jwt.sign({ id: data.id }, config.jwtAccessKey, { expiresIn: config.accessTokenExpiry })
    const refreshToken = jwt.sign({ id: data.id }, config.jwtRefershKey, { expiresIn: config.refreshTokenExpiry })

    return {
        accessToken,
        refreshToken,
    }
}

export function verifyJwt(token: string, key: string, cb: any) {
    jwt.verify(token, key, cb)
}