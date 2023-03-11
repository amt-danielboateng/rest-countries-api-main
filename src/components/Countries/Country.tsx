import React, {useState, useEffect, FC} from "react";
import { Link, useParams } from "react-router-dom";
import '../../country.css';

interface CountryDetails {
alpha2Code: string;
flag: string;
name: string;
nativeName: string;
population: number;
region: string;
subregion: string;
capital: string;
topLevelDomain: string;
currencies: { name: string }[];
languages: { name: string }[];
borders: string[];
}

const Country: FC = () => {
const [country, setCountry] = useState<CountryDetails[]>([]);
const {name} = useParams<{ name: string }>();

useEffect(() =>{
const fetchCountry = async() => {
const response = await fetch(`https://restcountries.com/v2/name/${name}`)
const country = await response.json()
setCountry(country);
}
fetchCountry()
}, [name])

return(
<>

<Link to="/">
<i className="fas fa-arrow-left"></i>Back Home
</Link>

<section className="country">
{country.map((c) => {
const {alpha2Code, flag, name, nativeName, population, region, subregion, capital, topLevelDomain, currencies=[], languages=[], borders=[]} = c;

return (
<article key={alpha2Code}>
    <div className="country-inner">
        <div className="flag">
        <img src={flag} alt={name} />
        </div>
    <div className="country-details">
        <div>
        <h2>{name}</h2>
        <h5>Native Name: <span>{nativeName}</span></h5>
        <h5>Population: <span>{population.toLocaleString()}</span></h5>
        <h5>Region: <span>{region}</span></h5>
        <h5>Sub Region: <span>{subregion}</span></h5>
        <h5>Capital: <span>{capital}</span>{" "}</h5>
        </div>
    <div>
    <h5>Top Level Domain: <span>{topLevelDomain}</span></h5>
    <h5>Currencies: <span>{currencies[0].name}</span></h5>
    <h5>Languages: <span>{languages[0].name}</span></h5>
    </div>
    </div>
    </div>

<div>
    <h3>Border Countries: </h3>
    <div className="borders">
    {borders.map((border) =>{
        return(
            <ul key={border}>
                <li>
                {border}
                </li>
            </ul>
        )
    })}
    </div>
</div>
</article>
    )
})}
</section>
</>
)
}

export default Country;