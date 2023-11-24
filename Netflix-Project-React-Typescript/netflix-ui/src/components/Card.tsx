import React, { useEffect, useState } from "react"
import { AppDispatch, getUserLikedMovies, movieType, removeFromLikedMovies } from "../store"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import video from "../assets/videoplayback.mp4"
import {IoPlayCircleSharp} from "react-icons/io5"
import {RiThumbUpFill,RiThumbDownFill} from "react-icons/ri"
import {BsCheck} from "react-icons/bs"
import {AiOutlinePlus} from "react-icons/ai"
import {BiChevronDown} from "react-icons/bi"
import { onAuthStateChanged } from "firebase/auth"
import { firebaseAuth } from "../utils/firebase-config"
import axios from "axios"
import { localhostAPI } from "../utils/API"
import { LikedMovies } from "../store"
import { useDispatch } from "react-redux"

interface CardProps {
    movieData : movieType;
    index : number;
    isLiked ?: boolean;
}

type Data = {
  msg : String | null
}

type Data2= {
  movies ?: LikedMovies[];
  msg ?: string
}

function Card({movieData,index , isLiked = false} : CardProps) {

  const navigate = useNavigate()
  const [isHovered,setIsHovered] = useState<boolean>(false)
  const [email,setEmail] = useState<String | null >(null)
  const dispatch = useDispatch<AppDispatch>()
  onAuthStateChanged(firebaseAuth,(currentUser)=>{
    if(currentUser) setEmail(currentUser.email)
    else navigate("/login")
  })
  const addToList = async()=>{
    try {
      const {data} = await axios.post(`${localhostAPI}/api/user/add`,{
        email,
        data : movieData
      }) as {data : Data}
      if(data.msg)
        console.log(data.msg)
    } catch (error) {
      console.log(error)        
    }
  }

  const removeFromList = ()=>{
    dispatch(removeFromLikedMovies({email,movieData}))
  }

  return (
    <Container 
      onMouseEnter={()=>setIsHovered(true)} 
      onMouseLeave={()=>setIsHovered(false)} 
    >
        <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt="movie" />

        {isHovered ? 
            <div className="hover" >
                <div className="image-video-container">
                <img 
                  src={`https://image.tmdb.org/t/p/w500${movieData.image}`} 
                  alt="movie" 
                  onClick={()=>navigate("/player")}  
                />
                <video 
                  src={video} 
                  autoPlay 
                  loop 
                  muted 
                  onClick={()=>navigate("/player")} 
                />
                </div>
                <div className="info-container flex column ">
                  <h3 className="name" onClick={()=>navigate("/player")} >{movieData.name}</h3>
                </div>
                <div className="icons flex j-between">
                  <div className="controls flex">
                    <IoPlayCircleSharp 
                      title="play" 
                      onClick={()=> navigate("/player")}
                    />
                    <RiThumbUpFill title="Like" />
                    <RiThumbDownFill title="Dislike" />
                    {
                      isLiked ? (
                        <BsCheck title="Remove From List" onClick={removeFromList} />
                      )
                      :
                      (
                        <AiOutlinePlus title="Add to my list" onClick={addToList} />
                      )
                    }
                  </div>
                  <div className="info">
                    <BiChevronDown title="More Info" />
                  </div>
                </div>
                <div className="genres flex">
                    <ul className="flex" >
                      {movieData.genres.map((genre)=>(
                        <li key={genre} >{genre}</li>
                      ))}
                    </ul>
                  </div>
            </div>
        :
            ""
        }

    </Container>
  )
}

export default Card

const Container = styled.div`
  max-width: 230px;
  width: 230px;
  height: 100%;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .hover {
    z-index: 90;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0,0,0,0.75) 0px 3px 10px;
    background-color: #181818;
    transition: 0.3s ease-in-out;

    .image-video-container{
      position: relative;
      height: 140px;
      img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
      video {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: absolute;
      }
    }
    .info-container{
      padding: 1rem;
      gap: 0.5rem;
    }
    .icons {
      .controls {
        display: flex;
        gap: 1rem;
      }
      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;

        &:hover {
          color: #b8b8b8;
        }
      }
    }
    .genres {
      ul {
        gap : 1rem;

        li {
          padding-right: 0.7rem;
          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }
`
