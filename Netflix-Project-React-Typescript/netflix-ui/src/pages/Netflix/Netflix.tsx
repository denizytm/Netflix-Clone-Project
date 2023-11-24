
//Packages
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { firebaseAuth } from "../../utils/firebase-config"
import { useDispatch, useSelector  } from "react-redux"

//Components
import Slider from "../../components/Slider"
import Navbar from "../../components/Navbar"

//Style
import { Container } from "./Netflix.style"
import MovieLogo from "../../assets/homeTitle.webp"
import backgroungImage from "../../assets/home.jpg"
import { FaPlay } from "react-icons/fa"
import { AiOutlineInfoCircle } from "react-icons/ai"

//Store
import { getGenres , AppDispatch , RootState, fecthMovies } from "../../store"

export default function Netflix() {

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const genresLoaded = useSelector((state : RootState)=>state.netflix.genresLoaded)
  const movies = useSelector((state: RootState)=> state.netflix.movies)

  useEffect(()=>{
    dispatch(getGenres())
  },[])  

  useEffect(()=>{
    if(genresLoaded) dispatch(fecthMovies({type : "all"}))
  },[genresLoaded])

  const [isScrolled,setIsScrolled] = useState<boolean>(false)

  window.onscroll = ()=>{
    setIsScrolled(window.scrollY === 0 ? false : true)
    return ()=> (window.onscroll = null)
  }

  onAuthStateChanged(firebaseAuth,(currentUser)=>{
    if(!currentUser) navigate("/login")
  })

  return (
    <Container>
      <Navbar isscrolled={isScrolled} />
      <div className="hero">
        <img 
          src={backgroungImage} 
          alt="background" 
          className="background-image"
        />
        <div className="container">
          <div className="logo">
            <img src={MovieLogo} alt="Movie Logo" />
          </div>
          <div className="buttons flex">
            <button onClick={()=>navigate("player")} className="flex j-center a-center" >
              <FaPlay />Play
            </button>
            <button className="flex j-center a-center" >
              <AiOutlineInfoCircle />More Info
            </button>
          </div>
        </div>
      </div>
      <Slider movies={movies} />
    </Container>
  )
}
