import styled from "styled-components"
import { AppDispatch, Genre, fecthDataByGenre } from "../store"
import { useDispatch } from "react-redux";

interface SelectGenreProps {
    genres : Genre[];
    type : string
}

const SelectGenre = ({genres,type} : SelectGenreProps)=> {

    const dispatch = useDispatch<AppDispatch>()

  return (
    <Select className="flex" onChange={(e)=>{
        dispatch(fecthDataByGenre({genre:e.target.value,type}))
    }} >
        {genres.map(genre=>{
            return(
                <option value={genre.id.toString()} key={genre.id.toString()} >
                    {genre.name}
                </option>
            )
        })}
    </Select>
  )
}

export default SelectGenre

const Select = styled.select`
    margin-left: 5rem;
    cursor: pointer;
    font-size: 1.4rem;
    background-color: rgba(0,0,0,0.4);
    color: white;
    
`
