import mongoose from 'mongoose';

const fingerprintSchema = new mongoose.Schema(
    {
        
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

const model = mongoose.model('Fingerprint', fingerprintSchema);

export const { schema } = model;

export default model;
