import { Schema, model, Types } from "mongoose";

interface IBranch {
    name: string;
    location: string;
    createdBy: Types.ObjectId;
}

const branchSchema = new Schema<IBranch>({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
    },
    createdBy :{
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        required: true,
    },
},
    { timestamps: true },
)

export const Branch = model<IBranch>('Branch', branchSchema);

