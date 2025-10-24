import { compare } from "bcryptjs";
import { LoginResponseDTO, LoginRequestDTO } from "../dtos/auth.dto";
import AdminRepository from "../respositories/admin.repository";
import HttpError from "../utils/error.util";
import { createTokens } from "../utils/jwt.util";

class AuthService {
    static async login(loginData: LoginRequestDTO): Promise<LoginResponseDTO> {

        const { email, password } = loginData;
        const admin: any = await AdminRepository.getAdminByEmail(email);
        if (!admin) {
            throw new HttpError("Invlaid Credentails", 404);
        }
        const isMatched = await compare(password, admin.password)
        if (!isMatched) {
            throw new HttpError("Invlaid Credentails", 404);
        }

        const tokens = createTokens(admin._id.toString())

        return {
            admin,
            tokens
        }
    }
}

export default AuthService;