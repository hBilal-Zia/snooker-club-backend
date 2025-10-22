import { compare } from "bcryptjs";
import { Admin } from "../models/Admin.model";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

class AuthController {
    async login(req:any, res:any) {
        try {
            const {email, password} = req.body;
            const admin = await Admin.findOne({email});
            if (!admin) {
               return res.status(404).json({
                success: false,
                message: "Invalid Credentials"
            }) 
            }

            const isMatched = await compare(password, admin.password);
            if (!isMatched) {
               return res.status(404).json({
                success: false,
                message: "Invalid Credentials"
            }) 
            }

            const accessToken =  jwt.sign({data: admin._id.toString()}, config.jwtAccessKey, {expiresIn: config.accessTokenExpiry})
            const refreshToken =  jwt.sign({data: admin._id.toString()}, config.jwtRefershKey, {expiresIn: config.refreshTokenExpiry})

            return res.status(200).json({
                success: true,
                message: "Login Successfull",
                data: {
                    admin,
                    accessToken,
                    refreshToken,
                }
            })
            

        } catch (error: any) {
            console.log(`Error from login Conotroller, Error: ${error.message}`)
            res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }
    }
}

export default new AuthController();