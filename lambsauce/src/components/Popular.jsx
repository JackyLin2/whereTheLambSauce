import { useEffect, useState } from "react";
import styled from "styled-components";
import {Splide, SplideSlide} from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/splide.min.css';
import {Link} from 'react-router-dom'

function Popular() {

const [popular, setPopular] = useState([])


useEffect(() => {
    popularDemand();
}, [])


    const popularDemand = async () => {
      const checkLocalStorage = localStorage.getItem("popular");


      if(checkLocalStorage){
        setPopular(JSON.parse(checkLocalStorage))
      }else{
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&number=9`) 
        const data = await api.json();
        localStorage.setItem("popular", JSON.stringify(data.recipes));
        setPopular(data.recipes)
      }
    }


  return (
    <div>
    
              <Wrapper> 
              <h3> Popular Picks </h3>
              <Splide options={{
                perPage: 4,
                arrows: false,
                drag: 'free',
                pagination: false,
                gap: '2rem'
                
              }}> 
              {popular.map((recipe) => {
                return(
              <SplideSlide  key = {recipe.id}>  
                  <Card> 
                  <Link to={"Info/" + recipe.id }>
                  <p> {recipe.title} </p>
                  <img  alt ="" src= {recipe.image}/>
                  </Link>
                   </Card>
              </SplideSlide>     
              );
      })}
            </Splide>     
            </Wrapper>
    </div> 
  )
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height:25 rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img{
    border-radius: 2rem;
    width: 100%;
    height: 100%;
  }

 
`;


export default Popular