
import { useNavigate } from "react-router-dom"
import Logo from "../assets/logo.png"
import styled from "styled-components"

type HeaderProps ={
  login : boolean
}

export default function Header({login}:HeaderProps) {

  const navigate = useNavigate()

  return (
    <Container className="flex a-center j-between" >
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>
      <button onClick={()=>navigate(login ? "/login" : "/signup")} >{login ? "Log In" : "Sign In"} </button>
    </Container>
  )
}

const Container = styled.div`
  padding: 0 4rem;

  .logo {
    img {
      height: 5rem;
    }
  }

  button {
    padding : 0.5rem 1rem;
    background-color: #e50914;
    border : none;
    cursor: pointer;
    color: white;
    border-radius: 0.2rem;
    font-weight: bolder;
    font-size: 1.05rem;

  }

`
