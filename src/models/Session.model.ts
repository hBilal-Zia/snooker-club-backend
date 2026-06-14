import { Schema, model, Types } from "mongoose";

interface ISession {
    players: string[];
    startTime: Date;
    endTime?: Date;
    playTime?: number;
    amount?: number;
    isPaid?: boolean;
    tableId: Types.ObjectId;
    branchId: Types.ObjectId;
    createdBy: Types.ObjectId;
}

const sessionSchema = new Schema<ISession>({
    players: {
        type: [String],
        required: true
    },
    startTime: {
        type: Date,
        required: true,
        default: Date.now
    },
    endTime: {
        type: Date,
        default: null
    },
    playTime: {
        type: Number,
        default: 0,
    },
    amount: {
        type: Number,
        default: 0,
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    tableId :{
        type: Schema.Types.ObjectId,
        ref: 'Table',
        required: true,
    },
    branchId :{
        type: Schema.Types.ObjectId,
        ref: 'Branch',
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

export const Session = model<ISession>('Session', sessionSchema);

