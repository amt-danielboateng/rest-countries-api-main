import React, {FC} from 'react';



    interface Props {
    onRegionChange: (region: string) => void;
  }
  
    const Filter:FC<Props> = ({ onRegionChange }) => {
        
      
        const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
          const region = event.target.value;
          onRegionChange(region);
        }


    return (

    <>
   
    <div className="select">
    <label htmlFor="select">Select a region:</label>
    <select name="select" id="select" onChange={handleRegionChange}>
        <option value="Filter by region">Filter by region</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
    </select>
        </div>
    

    </>
    )
}

export default Filter;