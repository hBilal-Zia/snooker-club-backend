import {Types} from "mongoose";
import { Admin } from "../models/Admin.model";
import { CreateAdminDTO } from "../dtos/admin.dto";

class AdminRepository {

    static async getAdminByEmail(email: string) {
       return await Admin.findOne({email})
    }

    static async createAdmin(createData: CreateAdminDTO) {
        const newAdmin = new Admin(createData)
        return newAdmin.save();
    }

    static async getAdminById(id: string) {
        return await Admin.findById(id)
    }

    static async getAdmins() {
        return await Admin.find()
    }

    static async updateAdmin(id: string, updateData: any) {
        return await Admin.findByIdAndUpdate(id, updateData)
    }

    static async deleteAdmin(id: string) {
        return await Admin.findByIdAndDelete(id)
    }}

export default AdminRepository;