import { Schema, model, Types } from "mongoose";

interface ITable {
    name: string;
    description: string;
    ratePerMinute: number;
    isAvailable?: boolean;
    branchId: Types.ObjectId;
    addedBy: Types.ObjectId;
}

const tableSchema = new Schema<ITable>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    ratePerMinute: {
        type: Number,
        required: true,
        default: 1
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    branchId :{
        type: Schema.Types.ObjectId,
        ref: 'Branch',
        required: true,
    },
    addedBy :{
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        required: true,
    },
},
    { timestamps: true },
)

export const Table = model<ITable>('Table', tableSchema);

