import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema(
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

const model = mongoose.model('Photo', photoSchema);

export const { schema } = model;

export default model;
