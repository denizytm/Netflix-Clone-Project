
import { onAuthStateChanged } from "firebase/auth"
import styled from "styled-components"
import Navbar from "../../components/Navbar"
import SelectGenre from "../../components/SelectGenre"
import Slider from "../../components/Slider"
import NotAvailable from "../../components/NotAvailable"
import { firebaseAuth } from "../../utils/firebase-config"
import { useEffect, useState } from "react"
import { AppDispatch, Genre, RootState, fecthMovies, getGenres, movieType } from "../../store"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Container } from "./TVShows.style"

const TVShows = ()=>{

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
  
    const genresLoaded = useSelector((state : RootState)=>state.netflix.genresLoaded)
    const movies = useSelector((state: RootState)=> state.netflix.movies) as movieType[]
    const genres = useSelector((state:RootState)=>state.netflix.genres) as Genre[]
  
    useEffect(()=>{
      dispatch(getGenres())
    },[])  
  
    useEffect(()=>{
      if(genresLoaded) dispatch(fecthMovies({type : "tv"}))
    },[genresLoaded])
  
    const [isScrolled,setIsScrolled] = useState<boolean>(false)
  
    window.onscroll = ()=>{
      setIsScrolled(window.scrollY === 0 ? false : true)
      return ()=> (window.onscroll = null)
    }
  
    onAuthStateChanged(firebaseAuth,(currentUser)=>{
      //if(currentUser) navigate("/")
    })
  
      return (
          <Container>
              <div className="navbar">
                  <Navbar isscrolled={isScrolled} />
              </div>
              <div className="data">
                <SelectGenre genres={genres} type="tv" />
                {
                  movies.length ? <Slider movies={movies} /> :
                  <NotAvailable />
                }
              </div>
          </Container>
      )

}

export default TVShows