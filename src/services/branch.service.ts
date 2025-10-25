import { AdminResponseDTO, CreateAdminDTO, UpdateAdminDTO } from "../dtos/admin.dto";
import { BranchResponseDTO, CreateBranchDTO, UpdateBranchDTO } from "../dtos/branch.dto";
import BranchRepository from "../respositories/branch.repository";
import HttpError from "../utils/error.util";
import { adminToDTO, branchToDTO } from "../utils/mappper.util";

class BranchService {
    static async getBranch(branchId: string){
        const branch = await BranchRepository.getBranchById(branchId);
        if (!branch) {
            throw new HttpError("Branch Not Found", 404);
        }
        return branchToDTO(branch);
    }

    static async createBranch(createData: CreateBranchDTO): Promise<BranchResponseDTO>{
        const newBranch = await BranchRepository.createBranch(createData);
        if (!newBranch) {
            throw new HttpError("Error Creating Branch", 400);
        }
       
        return branchToDTO(newBranch);
    }

    static async getBranches(): Promise<BranchResponseDTO[]>{
        let branches = await BranchRepository.getBranches();

        return branches.map((branch) => {
            return branchToDTO(branch)
        })
    }

    static async updateAdmin(branchId: string, updateData: UpdateBranchDTO): Promise<BranchResponseDTO>{
        let branch = await BranchRepository.getBranchById(branchId);
         if (!branch) {
            throw new HttpError("Branch Not Found", 404);
        }
        const updatedBranch = await BranchRepository.updateBranch(branchId, updateData);
        return branchToDTO(updatedBranch);

    }

    // static async deleteAdmin(adminId: string): Promise<void>{
    //     let admin = await BranchRepository.getAdminById(adminId);
    //      if (!admin) {
    //         throw new HttpError("Admin Not Found", 404);
    //     }
    //     await BranchRepository.deleteAdmin(adminId);
    //     return;

    // }
}

export default BranchService;