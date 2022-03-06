export const createObject = (model) => async (req, res, next) => {
    try {
        const result = await model.create(req.body);
        if (!result) {
            throw new Error(`Error creating the ${model.modelName}`);
        }
        return res.status(201).json({
            message: `${model.modelName} created`,
            data: result
        });
    } catch (error) {
        throw new Error(error.message);
    }
};

export const readObject = (model) => async (req, res, next) => {
    try {
        const result = await model.find();

        return res.status(200).json({
            message: `${model.modelName} retrieved`,
            data: result
        });
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateObject = (model) => async (req, res, next) => {
    try {
        const { id } = req.params;
        const doc = await model.findOneAndUpdate({ _id: id }, { ...req.body });

        if (!doc) {
            throw new Error(`Error updating the ${model.name}`);
        }
        return res.status(200).json({
            message: `${model.modelName} updated`,
            data: doc
        });;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteObject =(model) => async (req, res, next) => {
    try {
        const { id } = req.params;
        const doc = await model.deleteOne({ _id: id });

        if (!doc.deletedCount) {
            throw new Error(`Error deleting the ${model.name}`);
        }

        return res.status(204).json({
            message: `${model.modelName} deleted`,
            data: doc
        });;
    } catch (error) {
        throw new Error(error.message);
    }
};

export default {
    createObject,
    readObject,
    updateObject,
    deleteObject
};
