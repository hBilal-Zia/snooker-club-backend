import { AdminResponseDTO } from "../dtos/admin.dto";

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