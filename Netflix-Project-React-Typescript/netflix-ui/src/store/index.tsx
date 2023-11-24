import axios from "axios"

import {
    configureStore,
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit"

import { API_KEY, TMDB_BASE_URL } from "../utils/constants"
import { localhostAPI } from "../utils/API";

interface InitialState {
    movies : movieType[];
    genresLoaded : boolean;
    genres : Genre[]
}

const initialState : InitialState = {
    movies : [],
    genresLoaded : false,
    genres : [] 
}

export const getGenres = createAsyncThunk("netflix/genres",async()=>{
    const {data : {genres}}  = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`) as Genre[] as any
    return genres
})

export interface movieType {
    genre_ids ?: number[] ;
    name : string | undefined
    original_name ?: string;
    original_title ?: string;
    backdrop_path ?: string;
    image ?: string;
    id : number[];
    genres : string[]
}

export interface Genre {
    id : number | number[];
    name : string
}

const createArrayFromRawData = async (array : movieType[],moviesArray : movieType[],genres : Genre[])=>{
    array.forEach((movie)=>{
        const movieGenres : string[] = []
        if(typeof movie.genre_ids === 'object')
            movie.genre_ids.forEach((genre)=>{
                const name : Genre | undefined = genres.find(({id})=>id===genre)
                if(name) movieGenres.push(name.name)
            })
        if(movie.backdrop_path && typeof movie.genre_ids === 'object') {
            moviesArray.push({
                id : movie.genre_ids,
                name : movie?.original_name ? movie.original_name : movie.original_title,
                image : movie.backdrop_path,
                genres : movieGenres.slice(0,3),
            })
        }
    })
}

const getRawData = async(api : string ,genres : Genre[] ,paging :boolean | void)=>{
    const moviesArray : movieType[] = []

    for(let i = 1 ; moviesArray.length <60 && i <10 ; i++) {
        const {data : {results}} = await axios.get(`${api}${paging ? `&page=${i}` : ""}`)
        createArrayFromRawData(results,moviesArray,genres)
    }
    return moviesArray
}

interface FetchMoviesParam {
    type : string
}

export const fecthMovies = createAsyncThunk("netflix/trending",async({type} : FetchMoviesParam ,thunkApi)=>{
    const {netflix : {genres}} = thunkApi.getState() as RootState
    const data : Promise<movieType[]> = getRawData(`${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,genres,true)
    let awaitedData = await data
    return awaitedData
})

interface FetchDataByGenreParam {
    type : string,
    genre : Genre | string
}

export const fecthDataByGenre = createAsyncThunk("netflix/moviesByGenres",async({genre,type} : FetchDataByGenreParam ,thunkApi)=>{
    const {netflix : {genres}} = thunkApi.getState() as RootState
    const data : Promise<movieType[]> = getRawData(`${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,genres)
    let awaitedData = await data
    return awaitedData
})

export type LikedMovies = {
    id : number[];
    name : string;
    image ?: string;
    genres : string[]
  }

export const getUserLikedMovies = createAsyncThunk("netflix/getLiked",async(email : any)=>{
    const {data : {movies}} = await axios.post(`${localhostAPI}/api/user/get`,{email}) as {data : {movies : LikedMovies[]}}    
    return movies
})

type removeFromListType = {
    email : string | any,
    movieData : movieType
}

export const removeFromLikedMovies = createAsyncThunk("netflix/removeMovie",async({email,movieData} : removeFromListType)=>{
    const {data} = await axios.post(`${localhostAPI}/api/user/remove`,{email,movieData})
    if(data.status)
        return data.newList
})

const NetflixSlice = createSlice({
    name : "Netflix",
    initialState,
    extraReducers :(builder) => {
        builder.addCase(getGenres.fulfilled,(state,action)=>{  
            state.genres = action.payload
            state.genresLoaded = true
        })
        builder.addCase(fecthMovies.fulfilled,(state,action)=>{  
            state.movies = action.payload
        })
        builder.addCase(fecthDataByGenre.fulfilled,(state,action)=>{
            state.movies = action.payload
        })
        builder.addCase(getUserLikedMovies.fulfilled,(state,action)=>{
            state.movies = action.payload
        })
        builder.addCase(removeFromLikedMovies.fulfilled,(state,action)=>{
            state.movies = action.payload
        })  
    },
    reducers : {}
})

export const store = configureStore({
    reducer : {
        netflix : NetflixSlice.reducer
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>