
import {BsArrowLeft} from "react-icons/bs"
import video from "../../assets/videoplayback.mp4"
import { Container } from "./Player.style"
import { useNavigate } from "react-router-dom"

export const Player =() => {

  const navigate = useNavigate()

  return (
    <Container>
        <div className="player">
            <div className="back">
                <BsArrowLeft onClick={()=>navigate(-1)} />  {/* -1 means one page back on the browser */}
            </div>
            <video autoPlay loop controls muted src={video} />
        </div>
    </Container>
  )
}

