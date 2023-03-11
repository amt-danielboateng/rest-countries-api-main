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
    const response = await fetch(`https://restcountries.com/v2/region/${region}`)
    const data = await response.json()
    setCountries(data)

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
    <h4>Population: <span>{population}</span></h4>
    <h4>Region: <span>{region}</span></h4>
    <h4>Capital: <span>{capital}</span></h4> 

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