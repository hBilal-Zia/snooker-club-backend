import { AdminResponseDTO, CreateAdminDTO, UpdateAdminDTO } from "../dtos/admin.dto";
import AdminRepository from "../respositories/admin.repository";
import HttpError from "../utils/error.util";
import { adminToDTO } from "../utils/mappper.util";

class AdminService {
    static async getAdmin(adminId: string){
        const admin = await AdminRepository.getAdminById(adminId);
        if (!admin) {
            throw new HttpError("Admin Not Found", 404);
        }
        return adminToDTO(admin);
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

    static async getAdmins(): Promise<AdminResponseDTO[]>{
        let admins = await AdminRepository.getAdmins();

        return admins.map((admin) => {
            return adminToDTO(admin)
        })
    }

    static async updateAdmin(adminId: string, updateData: UpdateAdminDTO): Promise<AdminResponseDTO>{
        let admin = await AdminRepository.getAdminById(adminId);
         if (!admin) {
            throw new HttpError("Admin Not Found", 404);
        }
        const updatedAdmin = await AdminRepository.updateAdmin(adminId, updateData);
        return adminToDTO(updatedAdmin);

    }

    static async deleteAdmin(adminId: string): Promise<void>{
        let admin = await AdminRepository.getAdminById(adminId);
         if (!admin) {
            throw new HttpError("Admin Not Found", 404);
        }
        await AdminRepository.deleteAdmin(adminId);
        return;

    }
}

export default AdminService;