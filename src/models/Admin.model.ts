import mongoose from "mongoose";

interface IAdmin {
    name: string;
    email: string;
    password: string;
    role: string;
    phoneNo: string;
}

const adminSchema = new mongoose.Schema<IAdmin>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'super admin'],
        default: 'admin'
    },
    phoneNo: {
        type: String,
        required: true
    },
},
    { timestamps: true },
)

export const Admin = mongoose.model<IAdmin>('Admin', adminSchema);

