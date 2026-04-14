import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    contact: { type: String, required: true },
    password: { type: String, required: true },
    fullname: { type: String, required: true },
    role: {
        type: String,
        enum: ["buyer", "seller"],
        default: "buyer"
    }
})

userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }
    try {
        const hash = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, hash);
        
    } catch (error) {
        throw new Error("Error hashing password");
    }
})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

const userModel = mongoose.model('user', userSchema)
export default userModel;