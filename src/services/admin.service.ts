import { AdminResponseDTO, CreateAdminDTO } from "../dtos/admin.dto";
import AdminRepository from "../respositories/admin.repository";
import HttpError from "../utils/error.util";
import { adminToDTO } from "../utils/mappper.util";

class AdminService {
    static async getAdmin(){
    }

    static async createAdmin(createData: CreateAdminDTO): Promise<AdminResponseDTO>{
        const {email} = createData;
        const adminExists = await AdminRepository.getAdminByEmail(email);
        if (adminExists) {
            throw new HttpError("Admin Already Exists", 409);
        }
        const newAdmin = await AdminRepository.createAdmin(createData);
        return adminToDTO(newAdmin);
    }
}

export default AdminService;