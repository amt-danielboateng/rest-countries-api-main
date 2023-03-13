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


<section className="country">
<Link to="/">
    <button className="back">
<i className="fas fa-arrow-left"></i> Back
</button>
</Link>

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
    <div className="inner-details">
    <h5>Top Level Domain: <span>{topLevelDomain}</span></h5>
    <h5 className="currencies">Currencies: <span>{currencies.map((currency, index) => {
        return (
            <ul key={index}>
                <li className="currency">
                    {currency.name}
                </li>
            </ul>
        )
    })}</span></h5>
    <h5 className="languages">Languages: <span>{languages.map((language, index) => {
        return (
            <ul key={index}>
                <li className="lang">
                    {language.name}
                </li>
            </ul>
        )
    })}</span></h5>
    </div>
    </div>

<div>
    <h3 className="border-title">Border Countries:</h3>
    <div className="borders">
    {borders.map((border, index) =>{
        return(
            <ul key={index}>
                <li>
                {border}
                </li>
            </ul>
        )
    })}
    </div>
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