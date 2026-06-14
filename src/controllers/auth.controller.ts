import AuthService from "../services/auth.service";
import { NextFunction, Request, Response } from "express";
import { LoginResponseDTO, LoginRequestDTO, RefreshTokenRequestDTO } from "../dtos/auth.dto";
import { ApiResponse } from "../dtos/response.dto";
import { successApiResponse } from "../utils/response.util";

class AuthController {
    async login(req: Request<{}, {}, LoginRequestDTO, {}>, res: Response<ApiResponse<LoginResponseDTO>>, next: NextFunction) {
        try {
            const result = await AuthService.login(req.body)
            return res.status(200).json(
                successApiResponse("Login Successfull", result)
            )
        } catch (error: any) {
            console.log(`Error from login Conotroller: ${error}`)
            next(error)
        }
    }

    async refreshToken(req: Request<{}, {}, RefreshTokenRequestDTO, {}>, res: Response<ApiResponse<LoginResponseDTO>>, next: NextFunction) {
        try {
            const result = await AuthService.refreshToken(req.body)
            return res.status(200).json(
                successApiResponse("Tokens Generated Successfully.", result)
        )
        } catch (error: any) {
            console.log(`Error from login Conotroller: ${error}`)
            next(error)
        }
    }
}

export default new AuthController();