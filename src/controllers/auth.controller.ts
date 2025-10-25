import AuthService from "../services/auth.service";
import { NextFunction, Request, Response } from "express";
import { LoginResponseDTO, LoginRequestDTO } from "../dtos/auth.dto";
import { ApiResponse } from "../dtos/response.dto";

class AuthController {
    async login(req: Request<{}, {}, LoginRequestDTO, {}>, res: Response<ApiResponse<LoginResponseDTO>>, next: NextFunction) {
        try {
            const result = await AuthService.login(req.body)
            return res.status(200).json({
                success: true,
                message: "Login Successfull",
                data: {
                    ...result
                }
            })
        } catch (error: any) {
            console.log(`Error from login Conotroller: ${error}`)
            next(error)
        }
    }
}

export default new AuthController();