import dotevn from "dotenv";
dotevn.config();

const config = {
    port: parseInt(process.env.PORT as string),
    dbUrl: process.env.DB_URL as string,
    jwtAccessKey: process.env.JWT_SECRET_KEY as string,
    jwtRefershKey: process.env.JWT_REFRESH_SECRET_KEY as string,
    accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY as any,
    refreshTokenExpiry: process.env.RERESH_TOKEN_EXPIRY as any,
}

export default config;