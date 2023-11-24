import { movieType } from "../store";
import styled from "styled-components";
import Card from "./Card";
import { useEffect, useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

interface CardSliderProp {
    title : string;
    data : movieType[];
}

function CardSlider({data,title} : CardSliderProp) {

  const [showControls,setShowControls] = useState<boolean>(false)
  const [sliderPosition,setSliderPosition] = useState<number>(0)
  const listRef = useRef<HTMLDivElement>(null)

  const handleDirection = async (direction : "left" | "right")=>{
    if(listRef.current !== null){
      if(direction === "right"){
        setSliderPosition(v=>v-200)
      }else if (direction === "left" && sliderPosition < 0 ) {
        setSliderPosition(v=>v+200)
      }
    }  
  }

  useEffect(()=>{
    if(listRef.current && sliderPosition && sliderPosition >-1000)
      listRef.current.style.transform = `translateX(${sliderPosition}px)`
    else if(listRef.current) {
      setSliderPosition(0)
      listRef.current.style.transform = "translateX(0px)"
    }
  },[sliderPosition])

  return (
    <Container 
      className="flex column" 
      onMouseEnter={()=>setShowControls(true)}
      onMouseLeave={()=>setShowControls(false)}  
    >
      <h1>{title}</h1>
      <div className="wrapper flex ">
        <div className={`slider-action left ${!showControls ? "none" : ""} flex j-center a-center  `}>
          <AiOutlineLeft onClick={()=>handleDirection("left")} />
        </div>
        <div className="flex slider" ref={listRef} >
          {data.map((movie,index)=>
            <div key={index}>
              <Card movieData={movie} index={index}  />
            </div>
          )}
        </div>
        <div className={`slider-action right ${!showControls ? "none" : ""} flex j-center a-center  `}>
          <AiOutlineRight onClick={()=>handleDirection("right")} />
        </div>
      </div>
    </Container>
  )
}

export default CardSlider

const Container = styled.div`
  gap : 1rem;
  position: relative;
  padding: 2rem 0;

  h1 {
    margin-left: 50px;
  }
  .wrapper {
    .slider {
      width: max-content;
      gap : 1rem;
      transform: translateX(0);
      transition: 0.3s ease-in-out;
      margin-left: 50px;
    
    }
    .slider-action{
      position: absolute;
      z-index: 99;
      height: 100%;
      top: 0;
      bottom: 0;
      width: 50px;
      transition: 0.3s ease-in-out;
      svg {
        font-size: 2rem;
        cursor: pointer;
      }
    }
    .none {
      display: none;
    }
    .left{
      left: 0;
    }
    .right {
      right: 0;
    }
  }
`