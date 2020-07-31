import React,{useEffect,useState} from 'react';
import url from '../../constants';
import Axios from 'axios';
import styles from './CountryPicker.module.css'
import {NativeSelect,FormControl} from '@material-ui/core';


const CountryPicker= ({setCountry})=>{

   const [fetchedCountries,setFetchedCountries] = useState([]);

    useEffect(()=>{
        Axios.get(`${url}/countries`)
        .then(({data:{countries}})=>{
            
            const modifiedData = countries.map((countries)=> countries.name);
            setFetchedCountries(modifiedData);
        }); 
    },[setFetchedCountries]);


    return (

        <FormControl variant="outlined" className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e)=>setCountry(e.target.value)}>
                <option value="">Global</option>
                 { fetchedCountries.map((fetchedCountries,i)=> <option key={i} value={fetchedCountries}>{fetchedCountries}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;