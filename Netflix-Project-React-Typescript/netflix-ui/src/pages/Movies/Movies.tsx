
import { Container } from "./Movies.style"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { firebaseAuth } from "../../utils/firebase-config"
import { useDispatch, useSelector  } from "react-redux"
import { AppDispatch , RootState , getGenres , fecthMovies , movieType , Genre} from "../../store"
import Navbar from "../../components/Navbar"
import Slider from "../../components/Slider"
import NotAvailable from "../../components/NotAvailable"
import SelectGenre from "../../components/SelectGenre"

const Movies = ()=>{

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const genresLoaded = useSelector((state : RootState)=>state.netflix.genresLoaded)
  const movies = useSelector((state: RootState)=> state.netflix.movies) as movieType[]
  const genres = useSelector((state:RootState)=>state.netflix.genres) as Genre[]

  useEffect(()=>{
    dispatch(getGenres())
  },[])  

  useEffect(()=>{
    if(genresLoaded) dispatch(fecthMovies({type : "movie"}))
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
              <SelectGenre genres={genres} type="movie" />
              {
                movies.length ? <Slider movies={movies} /> :
                <NotAvailable />
              }
            </div>
        </Container>
    )
}

export default Movies
