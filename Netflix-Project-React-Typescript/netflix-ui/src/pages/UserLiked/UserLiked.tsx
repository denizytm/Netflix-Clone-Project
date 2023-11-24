
import { useDispatch } from "react-redux"
import { Container } from "./UserLiked.style"
import { useSelector } from "react-redux"
import { AppDispatch, RootState , getUserLikedMovies, movieType } from "../../store"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { firebaseAuth } from "../../utils/firebase-config"
import { useNavigate } from "react-router-dom"
import Navbar from "../../components/Navbar"
import Card from "../../components/Card"

export const UserLiked = ()=>{
    
    const navigate = useNavigate()

    const dispatch = useDispatch<AppDispatch>()
    const movies = useSelector((state: RootState)=> state.netflix.movies) as movieType[]
    const [email,setEmail] = useState<String | null>(null)

    onAuthStateChanged(firebaseAuth,(currentUser)=>{
      if(currentUser) setEmail(currentUser.email)
      else navigate("/login")
    })

    useEffect(()=>{
      if(email != null){
        dispatch(getUserLikedMovies(email))
      }
    },[email])  

    const [isScrolled,setIsScrolled] = useState<boolean>(false)

    window.onscroll = ()=>{
      setIsScrolled(window.scrollY === 0 ? false : true)
      return ()=> (window.onscroll = null)
    }

    return (
        <Container>
            <Navbar isscrolled={isScrolled} />
                <div className="content flex column">
                    <h1>My list</h1>
                    <div className="grid flex">
                        {movies.map((movie,index)=>{
                            return (
                            <Card 
                              movieData={movie} 
                              index={index} 
                              key={index} 
                              isLiked={true} 
                            />
                            )
                        })}
                    </div>
                </div>
        </Container>
    )
}
