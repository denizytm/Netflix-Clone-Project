import { User , UserType } from "../models/UserModel"
import { Request , Response } from "express"

const addToLikedMovies = async(req : Request ,res : Response)=>{
    try {
        const {email,data} = req.body

        const user : UserType | null = await User.findOne({email})  // trying to find the user from database
        if(user){           // will work if there's an user in the database
            const {likedMovies} = user // we catch the liked movie list
            const movieAlreadyLiked = likedMovies.find(({id})=> id.toString() === data.id.toString()) // returns the movie if its already exists in the array else returns undefined 
                                                        //I'm turning the ids to the string cause they are array and find method does not compare the arrays
            if(movieAlreadyLiked === undefined){         // if we cant find the movie data inside the liked movies list we go in here
                await User.updateOne({
                    _id : user._id
                },{
                    likedMovies : [...user.likedMovies,data]
                })
            }else return res.json({msg : "The movie is already in your list"})
        } else await User.create<UserType>({email,likedMovies : [data]})  // if we can't find the user from database we create a new one and also adding the liked movie data to the likedMovies array
        return res.json({msg : "The movie added successfully"}) 
    } catch (e) {
        res.json({msg : "Error adding movie"})
    }
}

type MovieType = {
    id : number[]
}

const removeFromLikedMovies = async(req : Request , res : Response)=>{
    const {movieData} = req.body as MovieType | any
    const {email} = req.body

    const userData = await User.findOne({email})

    if(userData && movieData){
        const newLikedMoives = userData.likedMovies.filter((movie : MovieType)=>((movie.id.toString()) != (movieData.id.toString()) ));
        await User.updateOne({email},{likedMovies : newLikedMoives})
        res.json({status : true , newList : newLikedMoives})
    }else res.send("cannot find user data") 
    
}

const getLikedMovies = async(req : Request,res : Response)=>{
    
    try {
        const {email} = req.body
        const user : UserType | null = await User.findOne({email})

        if(user){
            res.json({movies : user.likedMovies})
        }else res.json({msg : "Error while trying to find the user"})
    } catch (error) {
        res.json({msg : "Error while fetchind liked movies data"+error})
    }

}

export {
    addToLikedMovies,
    getLikedMovies,
    removeFromLikedMovies,
}