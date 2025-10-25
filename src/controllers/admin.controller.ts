import { NextFunction, Request, Response } from "express";
import { AdminResponseDTO, CreateAdminDTO, UpdateAdminDTO } from "../dtos/admin.dto";
import { ApiResponse } from "../dtos/response.dto";
import AdminService from "../services/admin.service";
import { successApiResponse } from "../utils/response.util";

class AdminController {
    async createAdmin(req: Request<{},{},CreateAdminDTO,{}>, res: Response<ApiResponse<{admin: AdminResponseDTO}>>, next: NextFunction) {
        try {
            const createData: CreateAdminDTO = req.body;
            const result = await AdminService.createAdmin(createData);
            res.status(201).json(
                successApiResponse("Admin Created Successfully.", {admin:result})
            )
        } catch (error: any) {
            console.log("Error from Create Admin Conotroller: ", error)
            next(error)
        }
    }

    async getAdmin(req: Request<{adminId: string},{},{},{}>, res: Response<ApiResponse<{admin: AdminResponseDTO}>>, next: NextFunction) {
        try {
            const {adminId} = req.params;
            const result = await AdminService.getAdmin(adminId);
            res.status(200).json(
                successApiResponse("Admin Found Successfully.", {admin:result})
            )
        } catch (error: any) {
            console.log("Error from Get Admin Conotroller: ", error)
            next(error)
        }
    }

    async getAdmins(req: Request<{},{},{},{}>, res: Response<ApiResponse<{admins: AdminResponseDTO[]}>>, next: NextFunction) {
        try {
            const result = await AdminService.getAdmins();
            res.status(200).json(
                successApiResponse("Admins Listed Successfully.", {admins: result})
            )
        } catch (error: any) {
            console.log("Error from Get Admins Conotroller: ", error)
            next(error)
        }
    }

    async upateAdmin(req: Request<{adminId: string},{},UpdateAdminDTO,{}>, res: Response<ApiResponse<{admin: AdminResponseDTO}>>, next: NextFunction) {
        try {
            const {adminId} = req.params;
            const result = await AdminService.updateAdmin(adminId, req.body);
            res.status(200).json(
                successApiResponse("Admin Updated Successfully.", {admin: result})
            )
        } catch (error: any) {
            console.log("Error from Update Admin Conotroller: ", error)
            next(error)
        }
    }

    async deleteAdmin(req: Request<{adminId: string},{},{},{}>, res: Response<ApiResponse<{}>>, next: NextFunction) {
        try {
            const {adminId} = req.params;
            await AdminService.deleteAdmin(adminId);
            res.status(200).json(
                successApiResponse("Admin Deleted Successfully.")
            )
        } catch (error: any) {
            console.log("Error from Delete Admin Conotroller: ", error)
            next(error)
        }
    }
}

export default new AdminController();