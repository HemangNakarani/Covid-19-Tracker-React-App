import React,{useState,useEffect } from 'react';
import styles from './app.module.scss';
import { Cards, Chart, CountryPicker } from './components';
import Axios from 'axios';
import url from './constants';
import corooona from './images/image.png';
import { Typography,Divider  } from '@material-ui/core';

function App(){

  const [responceData, setResponceData ] = useState({});
  const [country, setCountry ] = useState("");
  
          useEffect(()=>{

              let changeUrl = url;

              if(country)
              {
                  changeUrl = `${url}/countries/${country}`;
              }

              Axios.get(changeUrl)
                .then(({data})=>{

                const modifiedData = {
                  confirmed : data.confirmed,
                  recovered : data.recovered,
                  deaths : data.deaths,
                  lastUpdate : data.lastUpdate,
                };

            setResponceData(modifiedData);   
          });

       },[country]);


  return (
    <div className={styles.container}>

      <img src={corooona} alt="COVOD-19 Tracker" className={styles.image}/>
      <Cards data={responceData}></Cards>
      <CountryPicker setCountry={setCountry}></CountryPicker>
      <Chart responceData={responceData} country={country} />
      <Divider style={{width: '80%' , marginTop:'30px'}} />
      <Typography className={styles.typo} variant="caption">@Hemang Nakarani</Typography>
    </div>
  );
}

export default App;