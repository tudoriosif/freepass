import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';

const systemSchema = new mongoose.Schema(
    {
        systemID: {
            type: String,
            unique: true
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

systemSchema.pre('save', async function (next) {
    this.systemID = uuid();

    next();
});

const model = mongoose.model('System', systemSchema);

export const { schema } = model;

export default model;
