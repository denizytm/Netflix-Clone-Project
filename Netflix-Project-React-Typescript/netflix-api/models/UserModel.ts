import mongoose,{ Schema } from "mongoose";

type MovieType = {
    id : string;
    name : string;
    image ?: string;
    genres : string[]
}

export interface UserType {
    _id : mongoose.ObjectId ;
    email : String;
    likedMovies : MovieType[];
}

const userSchema : Schema  = new Schema({
    email : {
        type : String,
        required : true,
        unique : true,
        max : 50
    },
    likedMovies : Array<MovieType>,
})

export const User = mongoose.model("users",userSchema)
