import { NextFunction, Request, Response } from "express";
import { AdminResponseDTO, CreateAdminDTO } from "../dtos/admin.dto";
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
}

export default new AdminController();