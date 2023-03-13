import React, {useState, useEffect, useRef, FC} from 'react';
import { Link } from 'react-router-dom';
import Filter from '../Filter/Filter';


interface Country {
    name: string;
    population: number;
    region: string;
    capital: string;
    flag: string;
    alpha2Code: string;
}

const url = "https://restcountries.com/v2/all";

const Countries: FC = () => {

const [countries, setCountries] = useState<Country[]>([]);



useEffect(() =>{
const fetchCountries = async() =>{
const response = await fetch(url);
const countries = await response.json();
setCountries(countries);
}
fetchCountries();
}, [])

const inputRef = useRef<HTMLInputElement>(null);

const getCountryByName = async () => {
    
    const searchValue = inputRef.current?.value;

    if(searchValue?.trim()) {
    const response = await fetch(`https://restcountries.com/v2/name/${searchValue}`)
    const data = await response.json()
    setCountries(data)
    }

}

const getCountryByRegion = async (region: string) => {
    try {
            const response = await fetch(`https://restcountries.com/v2/region/${region}`)
            if (!response.ok) {
                throw new Error("Failed...");
            }
                const data = await response.json()
                setCountries(data)
            } catch (error) {
        console.error(error)
        alert("An error occurred while fetching data. Please try again later.")
    }
}



return (
<>
<form className='form' id='form'>
<input 
        type="search" 
        name="search" 
        id="search"
        placeholder='Search for a country...'
        ref={inputRef}
        onChange={getCountryByName}
        />
<img className='search-icon' src="/IcoMoon-Free-master/IcoMoon-Free-master/PNG/16px/135-search.png" alt="" />
<i className="fa-sharp fa-regular fa-magnifying-glass-location"></i>
<Filter onRegionChange={getCountryByRegion}/>
</form>

<section className="countries">
{countries.map(country => {
const {name, population, region, capital, flag, alpha2Code} = country;

return (
    <Link to={`/countries/${name}`} key={alpha2Code}> 
    
<article className="country-container">
<div className='flag up'>
<img src={flag} alt={name} />
</div>

<div className="details down">
    <h3 className='country-name'>Name: {name}</h3>
    <p>Population: <span className='values'>{population}</span></p>
    <p>Region: <span className='values'>{region}</span></p>
    <p>Capital: <span className='values'>{capital}</span></p> 

</div>
</article>
</Link>
)
})}
</section>
</>
)
}

export default Countries;