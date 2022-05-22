import mongoose from 'mongoose';
import { EVENT_TYPES } from '../../utils/constants';

const eventSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        systemID: {
            type: mongoose.Types.ObjectId,
            ref: 'System'
        },
        type: {
            type: String,
            enum: EVENT_TYPES.AS_ARRAY
        },
        hadFace: { 
            type: Boolean,
            default: false,
        },
        hadFinger: { 
            type: Boolean,
            default: false,
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

const model = mongoose.model('Event', eventSchema);

export const { schema } = model;

export default model;
