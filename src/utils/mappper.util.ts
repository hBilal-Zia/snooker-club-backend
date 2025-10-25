import { AdminResponseDTO } from "../dtos/admin.dto";
import { BranchResponseDTO } from "../dtos/branch.dto";
import { TableResponseDTO } from "../dtos/table.dto";

export function adminToDTO(adminDoc: any): AdminResponseDTO{
    return {
        id: adminDoc._id.toString(),
        name: adminDoc.name,
        email: adminDoc.email,
        role: adminDoc.role,
        phoneNo: adminDoc.phoneNo,
        createdAt: adminDoc?.createdAt ?? undefined,
        updatedAt: adminDoc?.updatedAt ?? undefined
    }

}

export function branchToDTO(branchDoc: any): BranchResponseDTO {
    return  {
        id: branchDoc._id.toString(),
        name: branchDoc.name,
        location: branchDoc.location,
        createdBy: branchDoc?.createdBy? adminToDTO(branchDoc?.createdBy) : undefined
    }
}

export function tableToDTO(tableDoc: any): TableResponseDTO {
    console.log(tableDoc)
    return  {
        id: tableDoc._id.toString(),
        name: tableDoc.name,
        description: tableDoc.description,
        ratePerMinute: tableDoc.ratePerMinute,
        isAvailable: tableDoc.isAvailable,
        addedBy: adminToDTO(tableDoc.addedBy),
        branch: branchToDTO(tableDoc.branchId),
    }
}