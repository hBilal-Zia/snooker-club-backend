import { NextFunction, Request, Response } from "express";
import { BranchResponseDTO, CreateBranchDTO } from "../dtos/branch.dto";
import { ApiResponse } from "../dtos/response.dto";
import AdminService from "../services/admin.service";
import BranchRepository from "../respositories/branch.repository";
import { successApiResponse } from "../utils/response.util";
import BranchService from "../services/branch.service";

class BranchController {

    async createBranch(req: Request<{}, {}, CreateBranchDTO, {}>, res: Response<ApiResponse<{branch: BranchResponseDTO}>>, next: NextFunction){
        try {
            const {name, location, createdBy} = req.body;
            const adminExists = await AdminService.getAdmin(createdBy);
            const newBranch = await BranchService.createBranch({name, location, createdBy: adminExists.id});

            return res.status(201).json(
                successApiResponse("Branch Created Successfully.", {branch: newBranch})
            )

        } catch (error: any) {
            console.log("Error from Create Branch Controller: ", error)
            next(error)
        }
    }

    async getBranch(req: Request<{branchId: string},{},{},{}>, res: Response<ApiResponse<{branch: BranchResponseDTO}>>, next: NextFunction) {
            try {
                const {branchId} = req.params;
                const result = await BranchService.getBranch(branchId);
                res.status(200).json(
                    successApiResponse("Branch Found Successfully.", {branch:result})
                )
            } catch (error: any) {
                console.log("Error from Get Branch Conotroller: ", error)
                next(error)
            }
        }

    async getBranches(req: Request<{},{},{},{}>, res: Response<ApiResponse<{branches: BranchResponseDTO[]}>>, next: NextFunction) {
        try {
            const result = await BranchService.getBranches();
            res.status(200).json(
                successApiResponse("Branches Listed Successfully.", {branches: result})
            )
        } catch (error: any) {
            console.log("Error from Get Branches Conotroller: ", error)
            next(error)
        }
    }
}

export default new BranchController();