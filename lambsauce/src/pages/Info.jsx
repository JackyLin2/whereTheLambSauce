import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'


function Info() {

    const params = useParams()
    const [details, setDetails] = useState({})
    const [active, setActive] = useState('instructions')

    const fetchDetail = async () => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`);
        const detailData = await data.json()
        setDetails(detailData)
       console.log(setDetails)
    }

    useEffect(() =>{
        fetchDetail()
    },[params.name])


  return (
    <DetailWrapper>
        <div>
            <h2> {details.title}</h2>
            <img src={details.image} alt=""/>
        </div>
        <Infor>
            <Button className={active === 'instructions' ? 'active' : ""}  onClick={() => setActive("instructions")}> Instructions </Button>
            <Button className={active === 'ingredients' ? 'active' : ""} onClick={() => setActive("ingredients")} > Ingredients  </Button>

        {active === 'instructions' && (
            <div>
            <h3 dangerouslySetInnerHTML={{__html: details.summary}}></h3>
            <h3 dangerouslySetInnerHTML={{__html: details.instructions}}></h3>
        </div>
        )}
        {active === 'ingredients' && (
            <ul>
           {details.extendedIngredients.map((ing) => (
            <li key={ing.id}> {ing.original}  </li>
           ))}
       </ul>
        )}
    

        </Infor>
    </DetailWrapper>
  )

}

const DetailWrapper = styled.div`
    margin-top: 10rem;
    margin-bottom: 5rem;
    display: flex;
    .active{
        background: linear-gradient(35deg, #494949, #313131);
        color:white;
    }

    h2{
        margin-bottom: 2rem;
    }

    li{
        font-size: 1.2rem;
        line-height: 2.5rem;
    }

    ul{
        margin-top:2rem
    }
`;

const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    margin-right: 2rem;
    font-weight: 600;
`;

const Infor = styled.div`
    margin-left: 10rem; 
`


export default Info