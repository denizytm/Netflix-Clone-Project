import CardSlider from "./CardSlider"
import { movieType } from "../store"
import styled from "styled-components"

interface SliderProps {
    movies : movieType[]
}

function Slider({movies} : SliderProps) {

    const getMoviesFromRange = (from : number ,to : number)=>{
        return movies.slice(from,to)
    }

  return (
    <Container>
        <CardSlider data={getMoviesFromRange(0,10)} title="Trending Now" />
        <CardSlider data={getMoviesFromRange(10,20)} title="New Releases" />
        <CardSlider data={getMoviesFromRange(20,30)} title="Blockbuster Movies" />
        <CardSlider data={getMoviesFromRange(30,40)} title="Popular on Netflix" />
        <CardSlider data={getMoviesFromRange(40,50)} title="Action Movies" />
        <CardSlider data={getMoviesFromRange(50,60)} title="Epics" />
    </Container>
  )
}

export default Slider

const Container = styled.div`

`