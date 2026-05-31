import dotenv from "dotenv";
import Joi from "joi";

dotenv.config();

interface AppConfig {
    port: number;
    dbUrl: string;
    jwtAccessKey: string;
    jwtRefershKey: string;
    accessTokenExpiry: string;
    refreshTokenExpiry: string;
}

const envSchema = Joi.object({
    PORT: Joi.number().integer().min(1).max(65535).required(),
    DB_URL: Joi.string().trim().required(),
    JWT_SECRET_KEY: Joi.string().trim().required(),
    JWT_REFRESH_SECRET_KEY: Joi.string().trim().required(),
    ACCESS_TOKEN_EXPIRY: Joi.string().trim().required(),
    RERESH_TOKEN_EXPIRY: Joi.string().trim().required(),
}).unknown(true);

const { error, value } = envSchema.validate(process.env, { convert: true });

if (error) {
    throw new Error(`Invalid configuration: ${error.message}`);
}

const config: Readonly<AppConfig> = Object.freeze({
    port: value.PORT,
    dbUrl: value.DB_URL,
    jwtAccessKey: value.JWT_SECRET_KEY,
    jwtRefershKey: value.JWT_REFRESH_SECRET_KEY,
    accessTokenExpiry: value.ACCESS_TOKEN_EXPIRY,
    refreshTokenExpiry: value.RERESH_TOKEN_EXPIRY,
});

export default config;
