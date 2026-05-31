import { compare } from "bcryptjs";
import { LoginDTO, LoginResponseDTO, RefreshTokenDTO } from "../dtos/auth.dto";
import AdminRepository from "../respositories/admin.repository";
import HttpError from "../utils/error.util";
import { createTokens, verifyJwt } from "../utils/jwt.util";
import config from "../config/config";
import { adminToDTO } from "../utils/mappper.util";

class AuthService {
    static async login(loginData: LoginDTO): Promise<LoginResponseDTO> {

        const { email, password } = loginData;
        const admin: any = await AdminRepository.getAdminByEmail(email);
        if (!admin) {
            throw new HttpError("Invlaid Credentails", 404);
        }
        const isMatched = await compare(password, admin.password)
        if (!isMatched) {
            throw new HttpError("Invlaid Credentails", 404);
        }

        const tokens = createTokens({id: admin._id.toString()})

        return {
             admin: adminToDTO(admin),
            tokens
        }
    }

    static async refreshToken(input: RefreshTokenDTO): Promise<LoginResponseDTO> {

        if (!input.refreshToken.trim()) {
            throw new HttpError("Refresh token required", 401);
        }
        const decoded = await verifyJwt<any>(input.refreshToken, config.jwtRefershKey)

        const admin = await AdminRepository.getAdminById(decoded.id);
        if (!admin) {
            throw new HttpError("Invalid Token", 401)
        }

        const tokens = createTokens({ id: admin._id.toString() })

        return {
            admin: adminToDTO(admin),
            tokens
        }
    }
}

export default AuthService;