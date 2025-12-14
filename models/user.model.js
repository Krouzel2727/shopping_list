
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'User Name is required'],
        trim:true,
        minLenngt:2,
        maxLenght:50
    },
    email:{
        type:String,
        required: [true,'User Email is required'],
        unique: true,
        trim: true,
        lowerCase: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/, 'Zadejte prosím platnou emailovou adresu'],
    },
    password:{
        type:String,
        required:[true,'User Password is required'],
        minLenngt:6
    }
},{timestamps:true});

const User = mongoose.model('User', userSchema);

export default User;