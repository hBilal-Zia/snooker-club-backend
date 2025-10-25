import { AdminResponseDTO } from "../dtos/admin.dto";
import { BranchResponseDTO } from "../dtos/branch.dto";

export function adminToDTO(adminDoc: any): AdminResponseDTO{
    return {
        id: adminDoc._id.toString(),
        name: adminDoc.name,
        email: adminDoc.email,
        role: adminDoc.role,
        phoneNo: adminDoc.phoneNo,
        createdAt: adminDoc.createdAt,
        updatedAt: adminDoc.updatedAt
    }

}

export function branchToDTO(branchDoc: any): BranchResponseDTO {
    return  {
        id: branchDoc._id.toString(),
        name: branchDoc.name,
        location: branchDoc.location,
        createdBy: adminToDTO(branchDoc.createdBy)
    }
}