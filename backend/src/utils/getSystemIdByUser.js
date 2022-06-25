import System from '../api/System/model';

export const getSystemByUser = async (user) => {
    const { systemID } = user;

    const system = await System.findOne({ systemID });

    return system;
};
