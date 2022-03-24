import { useEffect, useState } from "react";
import styled from "styled-components";
import {Splide, SplideSlide} from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/splide.min.css';
import {Link} from 'react-router-dom'

function Vegan() {

  const [vegetarian, setVegetarian] = useState([])


useEffect(() => {
    getVegetarian();
}, [])


    const getVegetarian = async () => {
      const checkLocalStorage = localStorage.getItem("vegetarian");


      if(checkLocalStorage){
        setVegetarian(JSON.parse(checkLocalStorage))
      }else{
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&number=9&tags=vegetarian`) 
        const data = await api.json();
        localStorage.setItem("vegetarian", JSON.stringify(data.recipes));
        setVegetarian(data.recipes)
      }
    }


  return (
    <div>
    
    <Wrapper> 
    <h3> Vegetarian Picks </h3>
    <Splide options={{
      perPage: 4,
      arrows: false,
      drag: 'free',
      pagination: false,
      gap: '2rem'
      
    }}> 
    {vegetarian.map((recipe) => {
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


export default Vegan