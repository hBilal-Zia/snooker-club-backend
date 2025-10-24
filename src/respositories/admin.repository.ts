import { Admin } from "../models/Admin.model";

class AdminRepository {

    static async getAdminByEmail(email: string) {
       return await Admin.findOne({email})
    }
}

export default AdminRepository;