import dotevn from "dotenv";
dotevn.config();

const config = {
    port: parseInt(process.env.PORT as string),
    dbUrl: process.env.DB_URL as string,
}

export default config;