import { CreateBranchDTO } from "../dtos/branch.dto";
import { Branch } from "../models/Branch.model";

class BranchRepository {

    static async createBranch(createData: CreateBranchDTO) {
        const newBranch = new Branch(createData);
        await newBranch.save(); 
        return await newBranch.populate({
            path: "createdBy",
            select: "_id name email role phoneNo",
        });
    }

    static async getBranchById(id: string) {
        return await Branch.findById(id).populate({
                path: "createdBy",
                select: "_id name email role phoneNo",
            });
    }

    static async getBranches() {
        return await Branch.find().populate({
                path: "createdBy",
                select: "_id name email role phoneNo",
            });
    }

    static async updateBranch(id: string, updateData: any) {
        return await Branch.findByIdAndUpdate(id, updateData, { new: true })
        .populate({
            path: "createdBy",
            select: "_id name email role phoneNo",
        });
    }

    static async deleteBranch(id: string) {
        return await Branch.findByIdAndDelete(id)
    }
}

export default BranchRepository;
