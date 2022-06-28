import mongoose from 'mongoose';
import { nanoid5 } from '../../config/nanoid';
import { NODE_TYPES } from '../../utils/constants';

const nodeSchema = new mongoose.Schema(
    {
        nodeID: {
            type: String,
            unique: true
        },
        systemID: {
            type: mongoose.Types.ObjectId,
            ref: 'System'
        },
        name: { type: String },
        type: {
            type: String,
            enum: NODE_TYPES.AS_ARRAY
        },
        status: {
            type: Boolean,
            default: true
        },
        addr: {
            type: Number
        }
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (obj, ret) => {
                delete ret._id;
            }
        }
    }
);

nodeSchema.pre('save', async function (next) {
    this.nodeID = nanoid5();

    next();
});

const model = mongoose.model('Node', nodeSchema);

export const { schema } = model;

export default model;
