"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromLikedMovies = exports.getLikedMovies = exports.addToLikedMovies = void 0;
const UserModel_1 = require("../models/UserModel");
const addToLikedMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, data } = req.body;
        const user = yield UserModel_1.User.findOne({ email }); // trying to find the user from database
        if (user) { // will work if there's an user in the database
            const { likedMovies } = user; // we catch the liked movie list
            const movieAlreadyLiked = likedMovies.find(({ id }) => id.toString() === data.id.toString()); // returns the movie if its already exists in the array else returns undefined 
            //I'm turning the ids to the string cause they are array and find method does not compare the arrays
            if (movieAlreadyLiked === undefined) { // if we cant find the movie data inside the liked movies list we go in here
                yield UserModel_1.User.updateOne({
                    _id: user._id
                }, {
                    likedMovies: [...user.likedMovies, data]
                });
            }
            else
                return res.json({ msg: "The movie is already in your list" });
        }
        else
            yield UserModel_1.User.create({ email, likedMovies: [data] }); // if we can't find the user from database we create a new one and also adding the liked movie data to the likedMovies array
        return res.json({ msg: "The movie added successfully" });
    }
    catch (e) {
        res.json({ msg: "Error adding movie" });
    }
});
exports.addToLikedMovies = addToLikedMovies;
const removeFromLikedMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { movieData } = req.body;
    const { email } = req.body;
    const userData = yield UserModel_1.User.findOne({ email });
    if (userData && movieData) {
        const newLikedMoives = userData.likedMovies.filter((movie) => ((movie.id.toString()) != (movieData.id.toString())));
        yield UserModel_1.User.updateOne({ email }, { likedMovies: newLikedMoives });
        res.json({ status: true, newList: newLikedMoives });
    }
    else
        res.send("cannot find user data");
});
exports.removeFromLikedMovies = removeFromLikedMovies;
const getLikedMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield UserModel_1.User.findOne({ email });
        if (user) {
            res.json({ movies: user.likedMovies });
        }
        else
            res.json({ msg: "Error while trying to find the user" });
    }
    catch (error) {
        res.json({ msg: "Error while fetchind liked movies data" + error });
    }
});
exports.getLikedMovies = getLikedMovies;
