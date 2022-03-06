import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        systemID: {
            type: mongoose.Types.ObjectId,
            ref: 'System'
        },
        mainUser: {
          type: mongoose.Types.ObjectId,
          ref: 'User'
        }
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (obj, ret) => {
                delete ret._id;
                delete ret.password;
            }
        }
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;

    next();
});

userSchema.methods.isValidPassword = async function (password) {
    const user = this;

    const compare = await bcrypt.compare(password, user.password);
    return compare;
};

userSchema.pre('findOneAndUpdate', async function (next) {
    if(!this._update.password) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this._update.password, salt);

    this._update.password = hash;

    next();
});

const model = mongoose.model('User', userSchema);

export const { schema } = model;

export default model;
