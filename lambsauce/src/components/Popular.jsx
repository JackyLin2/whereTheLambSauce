import { useEffect, useState } from "react";


function Popular() {

    const [popular, setPopular] = useState([])


useEffect(() => {
    popularDemand();
}, [])


    const popularDemand = async () => {

        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&number=9`) 
        const data = await api.json();
            console.log(data)

    }


  return (
    <div>Popular</div>
  )
}

export default Popular