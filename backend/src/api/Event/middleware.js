import Event from './model';
import System from '../System/model';
import mongoose from 'mongoose';

export const eventMiddleware = async (eventType, user) => {

    let systemID;

    if (typeof user.systemID === 'string') {
        systemID = await System.findOne({ systemID: user.systemID });
    }

    const newEvent = await Event.create({
        user: user._id || mongoose.Types.ObjectId(user.id),
        systemID: systemID?._id || user.systemID?._id || user.systemID,
        type: eventType,
        hadFace: user.hasFace,
        hadFinger: user.hasFinger
    });
    console.log('New event! ', eventType);
};
